"use client";

import Image from "next/image";
import Link from "next/link";
import CleanLinkToHome from "./CleanLinkToHome";

export default function LayoutHeader() {
  return (
    <header>
      <div className="px-6 md:px-32 py-5 flex bg-surface-secondary">
        <CleanLinkToHome className="mr-auto">
          <span className="font-bold font-lg">GamerShop</span>
        </CleanLinkToHome>
        <Link href="/cart">
          <Image src={"/icons/cart.svg"} width={24} height={24} alt="Cart" />
        </Link>
      </div>
    </header>
  );
}
