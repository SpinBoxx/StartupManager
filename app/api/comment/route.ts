import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body) return NextResponse.json({ message: "Body requis" });

  console.log(body);

  const comment = await prismadb.comment.create({
    data: { ...body },
  });

  return NextResponse.json(comment);
}

export async function GET() {
  const comments = await prismadb.comment.findMany();
  return NextResponse.json(comments);
}
