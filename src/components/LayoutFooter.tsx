"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
const CleanLinkToHome = dynamic(() => import("@/components/CleanLinkToHome"), {
  ssr: false,
});

export default function LayoutFooter() {
  return (
    <footer className="bg-neutral-700 px-6 md:px-32 py-16 flex items-center justify-center mt-auto">
      <CleanLinkToHome>
        <Image
          src={"/icons/ap-logo.svg"}
          width={170}
          height={44}
          alt="Apply Digital logo"
        />
      </CleanLinkToHome>
    </footer>
  );
}
