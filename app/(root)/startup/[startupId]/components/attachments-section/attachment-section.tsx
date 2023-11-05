"use client";

import { StartupAttachments } from "@prisma/client";
import AddAttachmentForm from "./attachment-form";
import FilePdfIcon from "@/components/svgs/file-pdf-icon";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustom } from "@/lib/custom-fetch";
import toast from "react-hot-toast";

interface Props {
  startupId: number;
  attachments: StartupAttachments[];
}

const AttachmentSection = ({ attachments, startupId }: Props) => {
  const getAttachments = async (): Promise<StartupAttachments[]> => {
    return await fetchCustom("/startupAttachments").then((response) =>
      response.json()
    );
  };

  const query = useQuery({
    queryKey: ["attachments"],
    queryFn: getAttachments,
  });

  return (
    <>
      <AddAttachmentForm startupId={startupId} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {query.data?.map((attachment) => (
          <Attachment attachment={attachment} />
        ))}
      </div>
    </>
  );
};

export default AttachmentSection;

const Attachment = ({ attachment }: { attachment: StartupAttachments }) => {
  const queryClient = useQueryClient();
  const onDelete = async () => {
    const response = await fetchCustom(`/startupAttachments/${attachment.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.success("Supprimé");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    }
  };

  let Icon;
  switch (attachment.extension) {
    case "application/pdf":
      Icon = FilePdfIcon;
    default:
      Icon = FilePdfIcon;
  }
  return (
    <div className="flex w-full gap-x-3 rounded bg-red-200 px-4 py-3 ">
      <div className="">
        <Icon className="h-6 w-6 fill-red-600" />
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="font-semibold text-red-500">{attachment.title}</span>
        <span className="text-sm text-red-500">12/03/4333</span>
        <div className="flex gap-x-5">
          <Link
            target="_blank"
            href={attachment.file}
            download={attachment.title}
            className="cursor-pointer text-sm font-medium text-red-700 underline"
          >
            Télécharger
          </Link>
          <div
            onClick={onDelete}
            className="cursor-pointer text-sm font-medium text-red-700"
          >
            Supprimer
          </div>
        </div>
      </div>
    </div>
  );
};
