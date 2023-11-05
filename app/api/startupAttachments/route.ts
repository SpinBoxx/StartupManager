import prismadb from "@/lib/prismadb";
import { startupAttachmentsAcceptedFormats } from "@/types/startup-attachments";
import { StartupAttachments } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const attachments = await prismadb.startupAttachments.findMany();

  return NextResponse.json(attachments);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { attachments } = body;

  const attachmentsSchema = z.array(
    z.object({
      title: z.string(),
      extension: z
        .string()
        .refine((format) =>
          startupAttachmentsAcceptedFormats.code.includes(format)
        ),
      file: z.string(),
      startupId: z.number(),
    })
  );

  const parsed = attachmentsSchema.safeParse(attachments);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          "Une erreur s'est produite lors du traitement de votre requête. Les données envoyées sont incorrectes.",
      },
      { status: 400 }
    );
  }

  const attachmentsCreated = await prismadb.startupAttachments.createMany({
    data: attachments,
  });

  return NextResponse.json(attachmentsCreated);
}
