import { Metadata } from "next";

import { DataTable } from "./components/startup-datatable/datatable";
import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import { columns } from "./components/startup-datatable/columns";
import ModalAddUpdate from "./components/startup-datatable/modal-add-update";

export const metadata: Metadata = {
  title: "Startup Manager",
};

export const revalidate = 0;

export default async function Home() {
  const startups = await prismadb.startup.findMany({
    include: {
      promo: true,
      contacts: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const formattedStartups = startups.map((startup) => ({
    ...startup,
    promo: undefined,
    promoName: startup.promo.name,
    contact: startup.contacts.at(0),
  }));

  const promotions = await prismadb.promo.findMany();

  return (
    <div>
      <Header
        data={{
          title: "Startups",
          description:
            "Retrouve ici, toutes les startup qui sont enregistrées sur la platforme.",
          nbItem: startups.length,
        }}
      />

      <DataTable className="mt-5" columns={columns} data={formattedStartups} />
      <ModalAddUpdate promotions={promotions} />
    </div>
  );
}
