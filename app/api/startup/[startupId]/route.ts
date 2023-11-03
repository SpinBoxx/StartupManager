import prismadb from "@/lib/prismadb";
import { Openstreetmap } from "@/types/openstreet-map";
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

  const { contacts, city, address } = body;

  if (!startupId)
    return NextResponse.json({ message: noStartupId }, { status: 401 });
  const _contacts = await prismadb.contact.findMany({
    where: {
      id: {
        in: contacts,
      },
    },
  });

  // On set la lattitude et longitude en utilisant une API externe
  let longitude, lattitude;
  if (city && address) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=jsonv2&limit=1&street=${address}`
    );
    // Ici on recupere un tableau qui contient x fois de location trouvé
    const data: Openstreetmap[] = await response.json();
    // On recupere la premiere location trouvé
    const singleData = data.at(0);
    if (response.ok && singleData !== undefined) {
      longitude = singleData.lon;
      lattitude = singleData.lat;
    }
  }

  const startup = await prismadb.startup.update({
    where: {
      id: Number(startupId),
    },
    data: {
      ...body,
      longitude,
      lattitude,
      contacts: {
        set: _contacts,
      },
    },
  });

  return NextResponse.json(startup, { status: 200 });
}
