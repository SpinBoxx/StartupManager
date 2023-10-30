import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";

interface Props {
  user: User;
}

const ProfilInformation = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-x-8">
      <div className="rounded-lg p-2 shadow">
        <UserIcon className="h-20 w-20 text-muted-foreground" />
      </div>
      <div className="mt-4 flex flex-col gap-y-1 font-bold">
        <div className="text-4xl font-bold tracking-tight">
          <span>Bonjour</span> <span>{user.username}</span>
        </div>
        <div className="font-normal text-muted-foreground">
          <span>@</span>
          <span>{user.email}</span>
        </div>
        <div>
          <Badge>{user.role}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfilInformation;
