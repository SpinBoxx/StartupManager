import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import MyProfilForm from "./components/my-profil-form";
import ProfilInformation from "./components/profil-info";
import getSession from "@/actions/get-session";
import { Suspense } from "react";
import prismadb from "@/lib/prismadb";

const MyProfilPage = async () => {
  const session = await getSession();

  if (!session) return <Loader2 className="animate-spin" />;

  const user = await prismadb.user.findFirst({
    where: {
      email: session.user?.email,
    },
  });
  if (!user) return <Loader2 className="animate-spin" />;

  return (
    <div className="flex flex-col  justify-center">
      <ProfilInformation user={user} />

      <Separator className="mt-8" />
      {user ? <MyProfilForm className="mt-4" user={user} /> : null}
    </div>
  );
};

export default MyProfilPage;
