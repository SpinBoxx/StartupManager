import getSession from "@/actions/get-session";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();

  const contact = await prismadb.contact.create({
    data: { ...body },
  });

  return NextResponse.json(contact);
}
