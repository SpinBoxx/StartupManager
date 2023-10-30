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
  });

  if (!startup) redirect("/");

  const promotions = await prismadb.promo.findMany();

  return (
    <div>
      <StartupEditForm promotions={promotions} startup={startup} />
    </div>
  );
};

export default UpdateStartupPage;
