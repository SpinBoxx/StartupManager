import prismadb from "@/lib/prismadb";
import ModalAddUpdate from "./components/contact-datatable/modal-add-update";
import Header from "@/components/header";

import { Metadata } from "next";
import { DataTable } from "./components/contact-datatable/datatable";
import { columns } from "./components/contact-datatable/columns";
import { fetchCustom } from "@/lib/custom-fetch";
import getSession from "@/actions/get-session";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "SUM - Contact",
};
export const dynamic = "force-dynamic";
const ContactSettingsPage = async () => {
  const contacts = await prismadb.contact.findMany();

  return (
    <div>
      <Header
        data={{
          title: "Les contacts",
          description:
            "Retrouve ici, tous les contacts disponibles pour les startups sur la platforme.",
          nbItem: contacts.length,
        }}
      />
      <DataTable className="mt-5" columns={columns} data={contacts} />

      <ModalAddUpdate />
    </div>
  );
};

export default ContactSettingsPage;
