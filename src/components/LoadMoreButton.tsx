"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LoadMoreButtonProps {
  currentPage: number;
  totalPages: number;
}

export default function LoadMoreButton({
  currentPage,
  totalPages,
}: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (currentPage >= totalPages) return null;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const nextPage = currentPage + 1;
    params.set("page", nextPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-6 text-center">
      <button onClick={handleClick}>Load More</button>
    </div>
  );
}
