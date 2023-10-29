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
  const { open, onOpen, user } = useModal();
  const roles = Object.keys(Role);

  const submitButtonText = user ? (
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
  const dialogTitle = user
    ? "Modifier un utilsateur"
    : "Ajouter un utilisateur";
  const toastSuccess = user
    ? "L'utilisateur a bien été modifié"
    : "L'utilisateur a bien été créé";
  const toastError = user
    ? "Une erreur est survenue dans la modification de l'utilisateur"
    : "Une erreur est survenue dans la création de l'utilisateur";

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email(mailNotValid),
    role: z.nativeEnum(Role, { required_error: "Le role est requis." }),
    username: z
      .string()
      .min(usernameMinLength, usernameMinErrorMessage)
      .max(usernameMaxLength, usernameMaxErrorMessage),
    password: z
      .string({ required_error: "Le mot de passe n'est pas valide." })
      .min(passwordMinLength, passwordMinErrorMessage)
      .max(passwordMaxLength, passwordMaxErrorMessage)
      .or(z.literal(undefined)),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: undefined,
      password: "",
      username: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      // password: ,
      email: user ? user.email : "",
      username: user ? user.username : "",
      role: user ? user.role : undefined,
    });
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);

    if (user) {
      await fetchCustom(`/users/${user.id}`, {
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
      await fetchCustom("/users", {
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
                      <Input placeholder={mailPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder={usernamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!user && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input placeholder={mailPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôles</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={rolePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Les rôles disponibles </SelectLabel>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
