"use client";

import { Eye, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { fetchCustom } from "@/lib/custom-fetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  dataId: number;
}

export default function ColumnActions({ dataId }: Props) {
  const [loading, setLoading] = useState<{
    global: boolean;
    action?: "edit" | "delete";
  }>({
    global: false,
  });
  const router = useRouter();
  const apiEndpoint = "startup";
  const onViewDetail = () => {
    router.push(`/startup/${dataId}`);
  };

  const onDelete = async () => {
    setLoading({ global: true, action: "delete" });
    const response = await fetchCustom(`/${apiEndpoint}/${dataId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("La startup a bien été supprimé");
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
          onClick={onViewDetail}
          variant="ghost"
          className="!h-auto !p-0 hover:!bg-transparent"
        >
          <Eye className="h-4 w-4 cursor-pointer text-blue-500" />
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
