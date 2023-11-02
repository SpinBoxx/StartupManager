import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name } = body;
  if (!name)
    return NextResponse.json(
      { message: "Le nom de la startup est requis" },
      { status: 400 }
    );

  const promo = await prismadb.startup.create({
    data: { ...body },
  });

  return NextResponse.json(promo);
}
