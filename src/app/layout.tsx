import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header>
          <div className="px-6 md:px-32 py-5 flex bg-surface-secondary">
            <Link className="mr-auto" href="/">
              <span className="font-bold font-lg text-neutral-700">
                GamerShop
              </span>
            </Link>
            <Link href="/cart">
              <Image
                src={"/icons/cart.svg"}
                width={24}
                height={24}
                alt="Cart"
              />
            </Link>
          </div>
        </header>
        <main className="px-6 md:px-32 py-5">{children}</main>
        <footer className="bg-neutral-700 px-6 md:px-32 py-16 flex items-center justify-center mt-auto">
          <Link href="/">
            <Image
              src={"/icons/ap-logo.svg"}
              width={170}
              height={44}
              alt="Apply Digital logo"
            />
          </Link>
        </footer>
      </body>
    </html>
  );
}
