import { fetchCustom } from "@/lib/custom-fetch";
import { columns } from "./components/users-datatable/columns";
import { DataTable } from "./components/users-datatable/datatable";
import prismadb from "@/lib/prismadb";
import ModalAddUpdate from "./components/users-datatable/modal-add-update";
import Header from "@/components/header";
import { Role } from "@prisma/client";

const UsersSettingsPage = async () => {
  const users = await prismadb.user.findMany();

  return (
    <div>
      <Header
        data={{
          title: "Utilisateurs",
          description:
            "Retrouve ici, tous les utilisateurs qui peuvent se connecter à la platforme.",
          nbItem: users.length,
        }}
      />
      <DataTable className="mt-5" columns={columns} data={users} />

      <ModalAddUpdate />
    </div>
  );
};

export default UsersSettingsPage;
