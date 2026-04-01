import type { Metadata } from "next";
import { Montserrat, Doto, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/nav";
import { cambo } from "@/lib/fonts";

const montserratHeading = Montserrat({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velris",
  description: "Velris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", montserrat.variable, doto.variable, cambo.variable, "font-sans", inter.variable, montserratHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
