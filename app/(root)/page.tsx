import { Metadata } from "next";

import { DataTable } from "./components/startup-datatable/datatable";
import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import { columns } from "./components/startup-datatable/columns";
import ModalAddUpdate from "./components/startup-datatable/modal-add-update";
import ExportButton from "./components/export-button";

export const metadata: Metadata = {
  title: "Startup Manager",
};

export default async function Home() {
  const startups = await prismadb.startup.findMany({
    include: {
      promo: true,
      contacts: true,
    },
  });

  const formattedStartups = startups.map((startup) => ({
    ...startup,
    promo: undefined,
    promoName: startup.promo.name,
    contact: startup.contacts.at(0),
  }));

  const promotions = await prismadb.promo.findMany();
  // await prismadb.startup.create({
  //   data: {
  //     name: "Promo test 1",
  //     description: "Desctipnio tempo",
  //     logo: "logo test",
  //     promoId: 2,
  //   },
  // });

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
