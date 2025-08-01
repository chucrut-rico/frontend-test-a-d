"use client";

import { useTransition } from "react";
import CatalogLoader from "./CatalogLoader";
import GenreFilter from "./GenreFilter";
import GameCard from "./GameCard";
import LoadMoreButton from "./LoadMoreButton";
import { Game } from "@/utils/endpoint";

interface CatalogContentProps {
  genre: string | null;
  page: number;
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export default function CatalogContent({
  genre,
  page,
  games,
  availableFilters,
  totalPages,
  currentPage,
}: CatalogContentProps) {
  // Usamos useTransition para detectar cambios de filtros y página
  const [isPending, startTransition] = useTransition();

  // El loadingKey depende de género y página para forzar reload visual en CatalogLoader
  const loadingKey = `${genre ?? "all"}-${page}`;

  return (
    <CatalogLoader loadingKey={loadingKey}>
      <GenreFilter selected={genre} filters={availableFilters} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <LoadMoreButton currentPage={currentPage} totalPages={totalPages} />
    </CatalogLoader>
  );
}
