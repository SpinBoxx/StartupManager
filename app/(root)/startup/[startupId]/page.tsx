import prismadb from "@/lib/prismadb";
import { Edit, Pin } from "lucide-react";
import { redirect } from "next/navigation";
import { TabsSection } from "./components/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { start } from "repl";

interface Props {
  params: {
    startupId: string;
  };
}

// or Dynamic metadata
export async function generateMetadata({ params }: Props) {
  const startup = await prismadb.startup.findFirst({
    where: {
      id: Number(params.startupId),
    },
    include: {
      contacts: true,
    },
  });
  if (!startup) redirect("/");
  return {
    title: `SUM - ${startup.name}`,
  };
}

const StartupPage = async ({ params }: Props) => {
  const startup = await prismadb.startup.findFirst({
    where: {
      id: Number(params.startupId),
    },
    include: {
      contacts: true,
    },
  });

  if (!startup) redirect("/");

  return (
    <div className="">
      <div className="flex flex-col items-center gap-y-4">
        <div className="mx-auto">
          {startup.logo ? (
            <img
              className=""
              src={startup.logo}
              width={200}
              height={200}
              alt="Logo sttartup"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-slate-600" />
          )}
        </div>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold tracking-tight">{startup.name}</p>
          <p className="font-normal tracking-normal text-muted-foreground">
            {startup.description}
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center text-muted-foreground">
            <Pin className="h-4 w-4" />
            Nantes
          </div>
        </div>
        <div className="ml-auto">
          <Link href={`/startup/${startup.id}/modifier`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
        </div>
        <Separator />
        <TabsSection data={{ contacts: startup.contacts }} />
      </div>
    </div>
  );
};

export default StartupPage;
