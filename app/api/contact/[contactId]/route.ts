import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    contactId: string;
  };
}

const noContactId = "L'id du contact est requis !";

export async function GET(req: Request, params: Props) {
  const { contactId } = { ...params.params };

  if (!contactId) return NextResponse.json({ message: noContactId });

  const contact = await prismadb.contact.findFirst({
    where: {
      id: Number(contactId),
    },
  });

  return NextResponse.json(contact);
}

export async function DELETE(req: Request, params: Props) {
  const { contactId } = { ...params.params };

  if (!contactId) return NextResponse.json({ message: noContactId });

  const contact = await prismadb.contact.delete({
    where: {
      id: Number(contactId),
    },
  });

  return NextResponse.json(contact);
}

export async function PATCH(req: Request, params: Props) {
  const { contactId } = { ...params.params };
  const body = await req.json();

  if (!contactId) return NextResponse.json({ message: noContactId });

  const contact = await prismadb.contact.update({
    where: {
      id: Number(contactId),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(contact);
}
