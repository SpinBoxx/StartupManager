"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
  Loader2,
  Plus,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import {
  startupDescriptionPlaceholder,
  startupDescriptionRequired,
  startupNamePlaceholder,
  startupNameRequired,
  startupPromoRequired,
} from "@/types/startup";
import { cn, fileToBase64 } from "@/lib/utils";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Promo, Startup } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { fetchCustom } from "@/lib/custom-fetch";
import Link from "next/link";

interface Props {
  promotions: Promo[];
  startup: Startup;
}

export default function StartupEditForm({ promotions, startup }: Props) {
  const [logo, setLogo] = useState<File>();
  const submitButtonText = (
    <>
      <Save className="mr-2 h-4 w-4" />
      Sauvegarder
    </>
  );

  const toastSuccess = "La startup a bien été créé";
  const toastError = "Une erreur est survenue dans la création de la startup";
  const apiEndpoint = "startup";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const formSchema = z.object({
    name: z.string({ required_error: startupNameRequired }),
    logo: z.any(),
    description: z.string({ required_error: startupDescriptionRequired }),
    promoId: z.number({ required_error: startupPromoRequired }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: startup.name,
      logo: undefined,
      description: startup.description,
      promoId: startup.promoId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (logo) {
      if (ACCEPTED_IMAGE_TYPES.includes(logo.type)) {
        if (logo.size < MAX_FILE_SIZE) {
          const base64 = await fileToBase64(logo);
          await fetchCustom(`/${apiEndpoint}`, {
            body: JSON.stringify({ ...values, logo: base64 }),
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
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder={startupNamePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setLogo(e.target.files[0]);
                      } else {
                        setLogo(undefined);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mx-auto flex gap-x-6">
            {startup.logo && (
              <img
                src={startup.logo}
                width={150}
                height={150}
                alt="Startup logo"
              />
            )}
            <ArrowRight className="my-auto w-fit" />
            {logo && (
              <Image
                width={150}
                height={150}
                src={URL.createObjectURL(logo)}
                alt="Logo startup"
              />
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={startupDescriptionPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="promoId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? promotions.find((promo) => promo.id === field.value)
                            ?.name
                        : "Selectionne une promo"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {promotions.map((promo) => (
                        <CommandItem
                          value={promo.name}
                          key={promo.id}
                          onSelect={() => {
                            form.setValue("promoId", promo.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              promo.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {promo.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Link href={`/startup/${startup.id}`}>
            <Button
              type="button"
              className="flex items-center"
              disabled={loading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
          </Link>

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
        </div>
      </form>
    </Form>
  );
}
