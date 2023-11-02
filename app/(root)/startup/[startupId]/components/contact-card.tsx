"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Contact } from "@prisma/client";
import { Check, CheckCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

interface Props {
  contact: Contact;
  className?: string;
  variant?: "minimalist" | "all";
}

const ContactCard = ({ contact, className, variant = "all" }: Props) => {
  return (
    <Card className={cn(variant === "minimalist" && "!p-0", className)}>
      {variant === "all" && (
        <CardHeader className="items-center justify-center">
          <CardTitle>{`${contact.firstname} ${contact.lastname}`} </CardTitle>
          <Badge className="h-full " variant="secondary">
            {contact.status}
          </Badge>
        </CardHeader>
      )}

      <CardContent className={cn(variant === "minimalist" && "!p-0")}>
        <div className="flex justify-center gap-x-8">
          {contact.phoneNumber !== null && (
            <Link
              href={`tel:${contact.phoneNumber}`}
              className="flex w-fit flex-col items-center justify-center"
            >
              <div className="w-fit cursor-pointer rounded-md bg-gradient-to-r from-blue-200 to-cyan-200 p-4 text-blue-600 shadow">
                <Phone />
              </div>
              <span className="mt-1 text-sm text-muted-foreground">
                Appeler le numéro
              </span>
            </Link>
          )}
          {contact.email !== null && (
            <Link
              href={`mailto:${contact.email}`}
              className="flex w-fit flex-col items-center justify-center"
            >
              <div className="w-fit cursor-pointer rounded-md bg-gradient-to-r from-blue-200 to-cyan-200 p-4 text-blue-600 shadow">
                <Mail />
              </div>
              <span className="mt-1 text-sm text-muted-foreground">
                Ouvrir dans outlook
              </span>
            </Link>
          )}
        </div>

        {/* <ButtonContact variant="phone" contact={contact} /> */}
      </CardContent>
    </Card>
  );
};

interface buttonContactInterface {
  variant: "email" | "phone";
  contact: Contact;
}
const ButtonContact = ({ variant, contact }: buttonContactInterface) => {
  return (
    <Popover>
      <PopoverTrigger>{contact.phoneNumber}</PopoverTrigger>
      <PopoverContent className="!w-fit" align="center" side="top">
        <div className="flex items-center gap-x-2">
          <CheckCircle className="text-green-500" />{" "}
          <span className="font-semibold">Copié !</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ContactCard;
