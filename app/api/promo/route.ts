import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const users = await prismadb.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { name } = body;
  if (!name)
    return NextResponse.json(
      { message: "Le nom de la promo est requis" },
      { status: 400 }
    );

  const promo = await prismadb.promo.create({
    data: { ...body },
  });

  return NextResponse.json(promo);
}
