"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

const MyProfilPage = () => {
  const session = useSession();
  console.log(session.data?.user);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-full border border-muted-foreground p-2">
        <User className="h-20 w-20 text-muted-foreground" />
      </div>
      <div className="mt-4 font-bold">
        <span>@</span>
        <span>{session.data?.user.email}</span>
      </div>
      <div>
        <Badge>{session.data?.user.role}</Badge>
      </div>
    </div>
  );
};

export default MyProfilPage;
