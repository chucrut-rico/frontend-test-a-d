"use client";

import CatalogLoader from "./CatalogLoader";
import GenreFilter from "./GenreFilter";
import GameCard from "./GameCard";
import LoadMoreButton from "./LoadMoreButton";
import { Game } from "@/utils/endpoint";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const loadingKey = `${genre ?? "all"}-${page}`;

  // Cuando loadingKey cambia, significa que la data nueva ya llegó, quitamos loading
  useEffect(() => {
    setIsLoading(false);
  }, [loadingKey]);

  // Función para activar loading antes de cambiar ruta
  function handleNavigateStart() {
    setIsLoading(true);
  }

  return (
    <CatalogLoader loadingKey={loadingKey} isLoading={isLoading}>
      <GenreFilter
        selected={genre}
        filters={availableFilters}
        onNavigateStart={handleNavigateStart}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <LoadMoreButton
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigateStart={handleNavigateStart}
      />
    </CatalogLoader>
  );
}
