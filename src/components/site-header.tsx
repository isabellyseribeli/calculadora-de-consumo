"use client";

import Link from "next/link";
import { Bolt, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/planta-da-casa", label: "Planta da Casa" },
  { href: "/dicas-de-economia", label: "Dicas de Economia" },
  { href: "/matriz-energetica", label: "Matriz Energética" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setSheetOpen(false)}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bolt className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              EnergyWise Home
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
           <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <div className="p-4">
               <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setSheetOpen(false)}>
                  <Bolt className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">
                    EnergyWise Home
                  </span>
                </Link>
                <nav className="flex flex-col gap-6 text-lg">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </nav>
               </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Future right-side items can go here */}
        </div>
      </div>
    </header>
  );
}
