import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { EnergyProvider } from "@/contexts/energy-provider";
import { Toaster } from "@/components/ui/toaster";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const fontHeadline = PT_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-headline",
});


export const metadata: Metadata = {
  title: "EcoWatt",
  description: "Calcule e gerencie o consumo de energia da sua casa.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          ptSans.variable,
          fontHeadline.variable,
        )}
      >
        <EnergyProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </EnergyProvider>
      </body>
    </html>
  );
}
