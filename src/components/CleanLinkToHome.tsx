"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { useCatalogLoading } from "@/contexts/CatalogLoadingContext";

interface CleanLinkToHomeProps {
  children: ReactNode;
  className?: string;
}

export default function CleanLinkToHome({
  children,
  className,
}: CleanLinkToHomeProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const hasParams = searchParams.toString() !== "";
  const router = useRouter();
  const { setLoading } = useCatalogLoading();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHome && hasParams) {
      setLoading(true);
    }

    router.push("/?");
    router.refresh();
  };

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
