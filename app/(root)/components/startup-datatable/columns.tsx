"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./datatable-header";
import ColumnActions from "./column-actions";
import type { Promo, Startup } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export type FilterColumnType = Startup & { promoName: string };

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
      <Badge variant="secondary">{row.original.promoName}</Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColumnActions dataId={row.original.id} />,
  },
];
