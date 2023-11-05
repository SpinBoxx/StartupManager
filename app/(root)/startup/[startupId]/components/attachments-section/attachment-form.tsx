"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plane, Send, SendHorizonal } from "lucide-react";
import { cn, fileToBase64 } from "@/lib/utils";
import { commentPlaceholder } from "@/zod-message";
import prismadb from "@/lib/prismadb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchCustom } from "@/lib/custom-fetch";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { startupAttachmentsAcceptedFormats } from "@/types/startup-attachments";

interface Props {
  startupId: number;
  className?: string;
}

const AddAttachmentForm = ({ startupId, className }: Props) => {
  const formSchema = z.object({
    files: z.string(),
  });

  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: "",
    },
  });
  const queryClient = useQueryClient();

  // 2. Define a submit handler.
  async function onUploadFiles(e: React.ChangeEvent<HTMLInputElement>) {
    // setLoading(true);
    const files = e.target.files;

    if (files) {
      const body = await Promise.all(
        Array.from(files).map(async (file) => ({
          title: file.name,
          extension: file.type,
          file: await fileToBase64(file),
          startupId,
        }))
      );

      const response = await fetchCustom("/startupAttachments", {
        method: "POST",
        body: JSON.stringify({ attachments: body }),
      });
      const data = await response.json();
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["attachments"] });
        toast.success("Pièces jointes envoyées avec succès !");
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    }
  }
  return (
    <Form {...form}>
      <form className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="files"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full items-center justify-center">
                  {!loading ? (
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Accepted format :{" "}
                          {startupAttachmentsAcceptedFormats.label.join(", ")}
                        </p>
                      </div>
                      <input
                        multiple
                        accept={startupAttachmentsAcceptedFormats.code.join(
                          ", "
                        )}
                        onChange={onUploadFiles}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddAttachmentForm;
