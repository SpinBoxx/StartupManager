import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // interface Session {
  //   user: {
  //     /** The user's postal address. */
  //   } & DefaultSession["user"] &
  //     User;
  // }
  interface Session {
    expires: string;
    user?: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    sub: string;
    exp?: number;
    iat?: number;
    jti?: string;
    user: User | UserAdapter;
  }
}
