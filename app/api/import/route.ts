import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  const body = await req.json();

  const { data } = body;

  const workbook = XLSX.read(data, {
    type: "binary",
  });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const start = 1;
  let nb = 0;
  for (let index = start; index < raw_data.length; index++) {
    console.log(raw_data[index]);
    await prismadb.startup.create({
      data: {
        name: raw_data[index][0],
        description: raw_data[index][0],
        promo: {
          connectOrCreate: {
            where: {
              name: raw_data[index][1],
            },
            create: {
              name: raw_data[index][1],
            },
          },
        },
      },
      include: {
        promo: true,
      },
    });
    nb++;
  }
  return NextResponse.json({ nb });
}
