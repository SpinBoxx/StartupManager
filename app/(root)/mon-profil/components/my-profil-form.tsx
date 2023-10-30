"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  authLoginSuccessMessage,
  mailPlaceholder,
  usernameMaxErrorMessage,
  usernameMaxLength,
  usernameMinErrorMessage,
  usernameMinLength,
  usernamePlaceholder,
} from "@/zod-message";
import { User } from "@prisma/client";
import { fetchCustom } from "@/lib/custom-fetch";

interface Props {
  className?: string;
  user: User;
}

const MyProfilForm = ({ className, user }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitButtonText = (
    <>
      <Save className="mr-2 h-4 w-4" /> Sauvegarder mes informations
    </>
  );

  const formSchema = z.object({
    email: z.string().email("L'email n'est pas valide"),
    username: z
      .string()
      .min(usernameMinLength, usernameMinErrorMessage)
      .max(usernameMaxLength, usernameMaxErrorMessage),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetchCustom(`/users/${user.id}`, {
      body: JSON.stringify(values),
      method: "PATCH",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast.success("Vos informations ont bien été modifié.");
          router.refresh();
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => toast.error("Une erreur innatendue est survenue."))
      .finally(() => setLoading(false));
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyProfilForm;
