import { Separator } from "@/components/ui/separator";
import LoginForm from "./components/login-form";
import { Metadata } from "next";
import getSession from "@/actions/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SUM - Login",
};

const LoginPage = async () => {
  const session = await getSession();
  if (session?.user?.email) {
    redirect("/");
  }
  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <div>LOGO</div>
      <Separator className="my-5 w-1/2" />
      <div className="flex w-1/2 flex-col">
        <span className="text-center text-2xl  font-bold">Se connecter</span>
        <span className="mt-3 text-center text-sm  text-muted-foreground">
          Entrez votre email et votre mot de passe ci-dessous puis cliquez sur
          le bouton "Se connecter"
        </span>
        <LoginForm className="mt-6" />
      </div>
    </div>
  );
};

export default LoginPage;
