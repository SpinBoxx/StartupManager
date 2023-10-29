import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const users = await prismadb.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const userAlreadyExist = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (userAlreadyExist)
    return NextResponse.json(
      { message: "L'email est deja utilise" },
      { status: 400 }
    );

  const user = await prismadb.user.create({
    data: { ...body, password: hashedPassword },
  });

  return NextResponse.json(user);
}
