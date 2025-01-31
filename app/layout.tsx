import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SupabaseProvider from "./supabase-provider";
import { Navbar } from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Website",
  description: "A simple blog website with admin CRUD functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
