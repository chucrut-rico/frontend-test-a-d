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
      <body className={inter.className}>
        <header>
          <h1>Game catalog</h1>
        </header>
        <main className="p-6">{children}</main>
        <footer className="bg-neutral-700 px-32 py-16 flex items-center justify-center">
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
