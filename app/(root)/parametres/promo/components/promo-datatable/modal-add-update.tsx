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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  mailNotValid,
  mailPlaceholder,
  passwordMaxErrorMessage,
  passwordMaxLength,
  passwordMinErrorMessage,
  passwordMinLength,
  rolePlaceholder,
  usernameMaxErrorMessage,
  usernameMaxLength,
  usernameMinErrorMessage,
  usernameMinLength,
  usernamePlaceholder,
} from "@/zod-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import { fetchCustom } from "@/lib/custom-fetch";
import { useRouter } from "next/navigation";

export default function ModalAddUpdate() {
  const { open, onOpen, promo } = useModal();

  const submitButtonText = promo ? (
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
  const apiEndpoint = "promo";
  const dialogTitle = promo ? "Modifier une promo" : "Ajouter une promo";
  const toastSuccess = promo
    ? "La promo a bien été modifié"
    : "La promo a bien été créé";
  const toastError = promo
    ? "Une erreur est survenue dans la modification de la promo"
    : "Une erreur est survenue dans la création de la promo";

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    name: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      name: promo ? promo.name : "",
    });
  }, [promo]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (promo) {
      await fetchCustom(`/${apiEndpoint}/${promo.id}`, {
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder={mailPlaceholder} {...field} />
                    </FormControl>
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
