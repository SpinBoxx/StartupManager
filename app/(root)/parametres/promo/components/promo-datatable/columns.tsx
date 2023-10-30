"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-header";
import ColumnActions from "./column-actions";
import type { Promo } from "@prisma/client";

export type FilterColumnType = Promo;

export const columns: ColumnDef<FilterColumnType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColumnActions dataId={row.original.id} />,
  },
];
