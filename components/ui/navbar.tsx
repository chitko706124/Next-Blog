"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PenSquare } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<any>(null);

  // Check auth status
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/content", label: "Content" },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            BlogSite
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-foreground/60 hover:text-foreground transition-colors",
                  pathname === link.href && "text-foreground font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block py-2 text-foreground/60 hover:text-foreground transition-colors",
                  pathname === link.href && "text-foreground font-medium"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/admin"
                className="block py-2"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" size="sm" className="w-full">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
