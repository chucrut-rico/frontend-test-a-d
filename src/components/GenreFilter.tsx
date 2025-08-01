"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface GenreFilterProps {
  selected: string | null;
  filters: string[];
  onNavigateStart: () => void;
}

export default function GenreFilter({
  selected,
  filters,
  onNavigateStart,
}: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const genre = e.target.value;

    const newParams = new URLSearchParams(searchParams.toString());

    if (genre === "all") {
      newParams.delete("genre");
      newParams.set("page", "1");
    } else {
      newParams.set("genre", genre);
      newParams.set("page", "1");
    }

    onNavigateStart();

    startTransition(() => {
      router.push(`/?${newParams.toString()}`);
    });
  }

  return (
    <div className="inline-flex items-center">
      <label htmlFor="genre" className="inline-block font-medium mr-2">
        Genre |
      </label>
      <select
        id="genre"
        value={selected ?? "all"}
        onChange={onChange}
        disabled={isPending}
        className="border p-2 rounded"
      >
        <option value="all">All</option>
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
}
