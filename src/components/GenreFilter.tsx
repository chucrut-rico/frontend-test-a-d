"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface GenreFilterProps {
  filters: string[];
  selected: string | null;
}

export default function GenreFilter({ filters, selected }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value) {
      params.set("genre", value);
    } else {
      params.delete("genre");
    }

    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="genre" className="inline-block font-medium mr-2">
        Genre |
      </label>
      <select
        id="genre"
        name="genre"
        value={selected ?? ""}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full max-w-xs"
      >
        <option value="">All genres</option>
        {filters.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
