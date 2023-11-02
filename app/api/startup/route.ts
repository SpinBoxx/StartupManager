import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const startups = await prismadb.startup.findMany({});
  return NextResponse.json(startups);
}

export async function POST(req: Request) {
  let body = await req.json();

  const { name } = body;
  if (!name)
    return NextResponse.json(
      { message: "Le nom de la startup est requis" },
      { status: 400 }
    );

  body = {
    ...body,
    contacts: [2],
  };

  const contacts = await prismadb.contact.findMany({
    where: {
      id: {
        in: [2],
      },
    },
  });

  const startup = await prismadb.startup.create({
    data: {
      ...body,
      contacts: {
        connect: contacts,
      },
    },
  });

  return NextResponse.json(startup);
}
