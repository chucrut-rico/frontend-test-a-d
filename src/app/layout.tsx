import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CatalogLoadingProvider } from "@/contexts/CatalogLoadingContext";
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col text-primary`}
      >
        <CatalogLoadingProvider>
          <LayoutHeader />
          <main className="px-6 md:px-32 py-5">{children}</main>
          <LayoutFooter />
        </CatalogLoadingProvider>
      </body>
    </html>
  );
}
