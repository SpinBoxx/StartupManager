import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    promoId: string;
  };
}

const noPromoId = "L'id de la promo est requis !";

export async function GET(req: Request, params: Props) {
  const { promoId } = { ...params.params };

  if (!promoId) return NextResponse.json({ message: noPromoId });

  const promo = await prismadb.promo.findFirst({
    where: {
      id: Number(promoId),
    },
  });

  return NextResponse.json(promo);
}

export async function DELETE(req: Request, params: Props) {
  const { promoId } = { ...params.params };

  if (!promoId) return NextResponse.json({ message: noPromoId });

  const promo = await prismadb.promo.delete({
    where: {
      id: Number(promoId),
    },
  });

  return NextResponse.json(promo);
}

export async function PATCH(req: Request, params: Props) {
  const { promoId } = { ...params.params };
  const body = await req.json();

  if (!promoId) return NextResponse.json({ message: noPromoId });

  const promo = await prismadb.promo.update({
    where: {
      id: Number(promoId),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(promo);
}
