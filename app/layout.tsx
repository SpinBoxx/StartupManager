import AuthProvider from "@/providers/auth-provider";
import "./globals.css";

import { Inter } from "next/font/google";

import ToastProvider from "@/providers/toast-provider";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/reactquery-provider";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <Toaster />
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
