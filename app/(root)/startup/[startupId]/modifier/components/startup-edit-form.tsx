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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
  Loader2,
  PlusCircle,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
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
import { Contact, Promo, Startup } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { fetchCustom } from "@/lib/custom-fetch";
import Link from "next/link";
import { useModal } from "@/app/(root)/parametres/contacts/components/contact-datatable/use-modal";
import ModalAddUpdate from "@/app/(root)/parametres/contacts/components/contact-datatable/modal-add-update";
import { Badge } from "@/components/ui/badge";
import { addressPlaceholder, cityPlaceholder } from "@/zod-message";

interface Props {
  data: {
    promotions: Promo[];
    startup: Startup & { contacts: Contact[] };
    contacts: Contact[];
  };
}

export default function StartupEditForm({ data }: Props) {
  const { promotions, contacts, startup } = data;
  const [logo, setLogo] = useState<File>();
  const { onOpen } = useModal();
  const submitButtonText = (
    <>
      <Save className="mr-2 h-4 w-4" />
      Sauvegarder
    </>
  );

  const toastSuccess = "La startup a bien été modifié";
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
    contacts: z.array(z.number()),
    address: z.string(),
    city: z.string(),
    createdAt: z.object({
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: startup.name,
      logo: undefined,
      description: startup.description,
      promoId: startup.promoId,
      contacts: startup.contacts.map((contact) => contact.id),
      address: startup.address ?? "",
      city: startup.city ?? "",
      createdAt: {
        startDate: startup.createdAt ?? undefined,
        endDate: startup.createdAt ?? undefined,
      },
    },
  });
  const { control } = form;
  const { append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {
    console.log(form.getValues().createdAt);
  }, [form.getValues().createdAt]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let base64 = startup.logo;
    if (logo) {
      if (ACCEPTED_IMAGE_TYPES.includes(logo.type)) {
        if (logo.size < MAX_FILE_SIZE) {
          await fileToBase64(logo).then(
            (response) => (base64 = response as string)
          );
        }
      }
    }
    await fetchCustom(`/${apiEndpoint}/${startup.id}`, {
      body: JSON.stringify({
        ...values,
        logo: base64,
        createdAt: values.createdAt.startDate,
      }),
      method: "PATCH",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast.success(toastSuccess);
          router.refresh();
          router.push(`/startup/${startup.id}`);
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => toast.error(toastError))
      .finally(() => setLoading(false));
  }

  return (
    <>
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
          <div className="grid grid-cols-3 gap-x-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={addressPlaceholder} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={cityPlaceholder} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* // @ts-ignore */}
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de création de la startup</FormLabel>
                <FormControl>
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    {...field}
                    onChange={(
                      value: DateValueType,
                      e?: HTMLInputElement | null | undefined
                    ) =>
                      form.setValue("createdAt", {
                        startDate: new Date(value?.startDate as string),
                        endDate: new Date(value?.startDate as string),
                      })
                    }
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
                <FormLabel>Promo</FormLabel>
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
                      <CommandInput placeholder="Chercher une promo..." />
                      <CommandEmpty>Aucune promo trouvé</CommandEmpty>
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

          <FormField
            control={form.control}
            name="contacts"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Contacts</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "relative justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <div className="space-x-3">
                          {field.value
                            ? field.value.map((id) => (
                                <Badge variant="secondary">
                                  {
                                    contacts.find(
                                      (contact) => id === contact.id
                                    )?.firstname
                                  }
                                </Badge>
                              ))
                            : "Selectionne une promo"}
                        </div>

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <div className="relative">
                        <PlusCircle
                          onClick={onOpen}
                          className="absolute bottom-1/2 right-2 top-1/2 my-auto h-4 w-4 cursor-pointer text-muted-foreground"
                        />
                        <CommandInput placeholder="Chercher un contact..." />
                      </div>

                      <CommandEmpty>Aucun contact trouvé.</CommandEmpty>
                      <CommandGroup>
                        {contacts.map((contact, index) => (
                          <CommandItem
                            value={contact.id.toString()}
                            key={contact.id}
                            onSelect={() => {
                              // Si le contact est deja selectionne on remove
                              if (field.value.includes(contact.id)) {
                                remove(
                                  field.value.findIndex(
                                    (id) => id === contact.id
                                  )
                                );
                              } else {
                                // Sinon on ajoute
                                append(contact.id);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(contact.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {contact.firstname}
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
      <ModalAddUpdate />
    </>
  );
}
