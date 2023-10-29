"use client";

import { Copy, Edit, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { useModal } from "./use-modal";
import { fetchCustom } from "@/lib/custom-fetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  dataId: number;
}

export default function ColumnActions({ dataId }: Props) {
  const { onOpen, setData } = useModal();
  const [loading, setLoading] = useState<{
    global: boolean;
    action?: "edit" | "delete";
  }>({
    global: false,
  });
  const router = useRouter();

  const onEdit = async () => {
    setLoading({ global: true, action: "edit" });
    const response = await fetchCustom(`/users/${dataId}`);
    const data = await response.json();
    if (response.ok) {
      setData(data);
      setLoading({ global: false });
    } else {
      toast.error(data.message ?? "Une erreur innatendue est survenue");
    }
  };

  const onDelete = async () => {
    setLoading({ global: true, action: "delete" });
    const response = await fetchCustom(`/users/${dataId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("L'utilisateur a bien été supprimé");
      setLoading({ global: false, action: "delete" });
      router.refresh();
    } else {
      toast.error(data.message ?? "Une erreur innatendue est survenue");
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      {loading.global && loading.action === "edit" ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Button
          onClick={onEdit}
          variant="ghost"
          className="!h-auto !p-0 hover:!bg-transparent"
        >
          <Edit className="h-4 w-4 cursor-pointer text-blue-500" />
        </Button>
      )}
      {loading.global && loading.action === "delete" ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Button
          onClick={onDelete}
          variant="ghost"
          className="!h-auto !p-0 hover:!bg-transparent"
        >
          <Trash className="h-4 w-4 cursor-pointer text-red-500" />
        </Button>
      )}
    </div>
  );
}
