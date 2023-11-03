import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import StartupEditForm from "./components/startup-edit-form";

interface Props {
  params: {
    startupId: string;
  };
}

const UpdateStartupPage = async ({ params }: Props) => {
  const startup = await prismadb.startup.findFirst({
    where: {
      id: Number(params.startupId),
    },
    include: {
      contacts: true,
    },
  });

  if (!startup) redirect("/");

  const promotions = await prismadb.promo.findMany();
  const contacts = await prismadb.contact.findMany();

  return (
    <div>
      <StartupEditForm data={{ promotions, startup, contacts }} />
    </div>
  );
};

export default UpdateStartupPage;
