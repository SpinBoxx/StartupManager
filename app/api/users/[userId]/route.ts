import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    userId: string;
  };
}

const noUserId = "L'userId est requis !";

export async function GET(req: Request, params: Props) {
  const { userId } = { ...params.params };

  if (!userId) return NextResponse.json({ message: noUserId });

  const user = await prismadb.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, params: Props) {
  const { userId } = { ...params.params };

  if (!userId) return NextResponse.json({ message: noUserId });

  const user = await prismadb.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: Request, params: Props) {
  const { userId } = { ...params.params };
  const body = await req.json();

  if (!userId) return NextResponse.json({ message: noUserId });

  const user = await prismadb.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(user);
}
