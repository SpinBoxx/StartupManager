"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Plane, Send, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { commentPlaceholder } from "@/zod-message";
import prismadb from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchCustom } from "@/lib/custom-fetch";

interface Props {
  startupId: number;
  className?: string;
}

const AddCommentForm = ({ startupId, className }: Props) => {
  const formSchema = z.object({
    message: z.string(),
  });
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetchCustom("/comment", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        startupId,
        userId: session.data?.user?.id,
      }),
    })
      .then(() => {
        setLoading(false);
        router.refresh();
      })
      .catch((error) => toast.error(error.data.response.message));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl className="!flex gap-x-4">
                <div className="relative">
                  <Textarea
                    placeholder={commentPlaceholder}
                    {...field}
                    className="pr-4"
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full">
          <Button type="submit" className="ml-auto">
            Ajouter <SendHorizonal className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCommentForm;
