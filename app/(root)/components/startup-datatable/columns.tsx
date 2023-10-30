"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-header";
import ColumnActions from "./column-actions";
import type { Promo, Startup } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export type FilterColumnType = Startup & { promo: Promo; promoName: string };

export const columns: ColumnDef<FilterColumnType>[] = [
  {
    accessorKey: "id",
    header: "Id",
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
      <Badge variant="secondary">{row.original.promoName}</Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColumnActions dataId={row.original.id} />,
  },
];
