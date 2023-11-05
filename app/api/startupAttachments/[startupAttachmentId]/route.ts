import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    startupAttachmentId: string;
  };
}

export async function DELETE(req: Request, params: Props) {
  const { startupAttachmentId } = { ...params.params };

  if (!startupAttachmentId) return NextResponse.json({ message: "oas" });

  const startupAttachment = await prismadb.startupAttachments.delete({
    where: {
      id: Number(startupAttachmentId),
    },
  });

  return NextResponse.json(startupAttachment);
}
