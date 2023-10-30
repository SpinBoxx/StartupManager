"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useModal } from "./use-modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer par startup..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className=" w-[150px] lg:w-[250px]"
        />
        <Input
          placeholder="Filtrer par promo..."
          value={
            (table.getColumn("promoName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("promoName")?.setFilterValue(event.target.value)
          }
          className=" w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <Button className="" onClick={onOpen}>
          <Plus className="h-4 w-4 md:mr-2" />{" "}
          <span className="hidden md:block">Ajouter une startup</span>
        </Button>
      </div>
    </div>
  );
}
