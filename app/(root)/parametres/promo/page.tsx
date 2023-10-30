import prismadb from "@/lib/prismadb";
import ModalAddUpdate from "./components/promo-datatable/modal-add-update";
import Header from "@/components/header";

import { Metadata } from "next";
import { DataTable } from "./components/promo-datatable/datatable";
import { columns } from "./components/promo-datatable/columns";

export const metadata: Metadata = {
  title: "SUM - Promo",
};

const UsersSettingsPage = async () => {
  const promos = await prismadb.promo.findMany();

  return (
    <div>
      <Header
        data={{
          title: "Les promotions",
          description:
            "Retrouve ici, toutes les promo enregistrés sur la platforme.",
          nbItem: promos.length,
        }}
      />
      <DataTable className="mt-5" columns={columns} data={promos} />

      <ModalAddUpdate />
    </div>
  );
};

export default UsersSettingsPage;
