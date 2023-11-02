import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    startupId: string;
  };
}

const noStartupId = "L'id de la startup est requis !";

export async function GET(req: Request, params: Props) {
  const { startupId } = { ...params.params };

  if (!startupId) return NextResponse.json({ message: noStartupId });

  const startup = await prismadb.startup.findFirst({
    where: {
      id: Number(startupId),
    },
    include: {
      contacts: true,
    },
  });

  return NextResponse.json(startup);
}

export async function DELETE(req: Request, params: Props) {
  const { startupId } = { ...params.params };

  if (!startupId) return NextResponse.json({ message: noStartupId });

  const startup = await prismadb.startup.delete({
    where: {
      id: Number(startupId),
    },
  });

  return NextResponse.json(startup);
}

export async function PATCH(req: Request, params: Props) {
  const { startupId } = { ...params.params };
  const body = await req.json();

  if (!startupId) return NextResponse.json({ message: noStartupId });

  const startup = await prismadb.startup.update({
    where: {
      id: Number(startupId),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(startup);
}
