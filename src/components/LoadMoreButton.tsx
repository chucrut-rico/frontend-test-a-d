"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface LoadMoreButtonProps {
  currentPage: number;
  totalPages: number;
  onNavigateStart: () => void;
}

export default function LoadMoreButton({
  currentPage,
  totalPages,
  onNavigateStart,
}: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (currentPage >= totalPages) return null;

  function onClick() {
    const newPage = currentPage + 1;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());

    onNavigateStart(); // <-- activamos loading antes de navegar

    startTransition(() => {
      router.push(`/?${newParams.toString()}`);
    });
  }

  return (
    <div className="mt-6 text-center">
      <button onClick={onClick} disabled={isPending}>
        {isPending ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
