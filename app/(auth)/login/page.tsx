import { Separator } from "@/components/ui/separator";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <div>LOGO</div>
      <Separator className="my-5 w-1/3" />
      <div className="flex w-1/3 flex-col">
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
