"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface CleanLinkToHomeProps {
  children: ReactNode;
  className?: string;
}

export default function CleanLinkToHome({
  children,
  className,
}: CleanLinkToHomeProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/?");
    router.refresh();
  };

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
