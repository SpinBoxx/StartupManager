"use client";

import { useModal } from "./use-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import { fetchCustom } from "@/lib/custom-fetch";
import { useRouter } from "next/navigation";
import {
  firstnamePlaceholder,
  lastnamePlaceholder,
  mailPlaceholder,
  phoneNumberPlaceholder,
  statusPlaceholder,
} from "@/zod-message";

export default function ModalAddUpdate() {
  const { open, onOpen, contact } = useModal();

  const submitButtonText = contact ? (
    <>
      <Save className="mr-2 h-4 w-4" />
      Sauvegarder
    </>
  ) : (
    <>
      <Plus className="mr-2 h-4 w-4" />
      Ajouter
    </>
  );
  const apiEndpoint = "contact";
  const dialogTitle = contact ? "Modifier un contact" : "Ajouter un contact";
  const toastSuccess = contact
    ? "Le contact a bien été modifié"
    : "Le contact a bien été créé";
  const toastError = contact
    ? "Une erreur est survenue dans la modification du contact"
    : "Une erreur est survenue dans la création du contact";

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    status: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      status: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      firstname: contact ? contact.firstname : "",
      lastname: contact ? contact.lastname : "",
      email: contact ? contact.email : "",
      phoneNumber: contact ? contact.phoneNumber : "",
      status: contact ? contact.status : "",
    });
  }, [contact]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (contact) {
      await fetchCustom(`/${apiEndpoint}/${contact.id}`, {
        body: JSON.stringify(values),
        method: "PATCH",
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            toast.success(toastSuccess);
            router.refresh();
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => toast.error(toastError))
        .finally(() => setLoading(false));
    } else {
      await fetchCustom(`/${apiEndpoint}`, {
        body: JSON.stringify(values),
        method: "POST",
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            toast.success(toastSuccess);
            router.refresh();
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => toast.error(toastError))
        .finally(() => setLoading(false));
    }
  }

  return (
    <Dialog onOpenChange={onOpen} open={open}>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid  gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={mailPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder={firstnamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder={lastnamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="off"
                        placeholder={phoneNumberPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut dans l'entreprise</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={statusPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      On entend ici le rôle de la personne dans l'entreprise.
                      Est-il CEO, directeur général, trésorier, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  submitButtonText
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
