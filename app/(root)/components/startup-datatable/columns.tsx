"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-header";
import ColumnActions from "./column-actions";
import type { Contact, Promo, Startup } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ContactCard from "../../startup/[startupId]/components/contact-card";

export type FilterColumnType = Startup & {
  promoName: string;
  contact: Contact | undefined;
};

export const columns: ColumnDef<FilterColumnType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          console.log(table.getSelectedRowModel());
        }}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Startup" />
    ),
  },
  {
    accessorKey: "promoName",
    header: "Promo",
    cell: ({ row }) => (
      <Badge variant="secondary" className="whitespace-nowrap">
        {row.original.promoName}
      </Badge>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) =>
      row.original.contact ? (
        <Popover>
          <PopoverTrigger>
            {row.original.contact.firstname} {row.original.contact.lastname}
          </PopoverTrigger>
          <PopoverContent className="!w-fit" align="center" side="top">
            <ContactCard
              variant="minimalist"
              className="border-none shadow-none"
              contact={row.original.contact}
            />
          </PopoverContent>
        </Popover>
      ) : (
        "/"
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColumnActions dataId={row.original.id} />,
  },
];
