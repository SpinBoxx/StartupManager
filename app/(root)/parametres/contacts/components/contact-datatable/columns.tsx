"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-header";
import ColumnActions from "./column-actions";
import type { Contact, Promo } from "@prisma/client";

export type FilterColumnType = Contact;

export const columns: ColumnDef<FilterColumnType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Num. tel." />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColumnActions dataId={row.original.id} />,
  },
];
