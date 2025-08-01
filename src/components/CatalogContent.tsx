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

  useEffect(() => {
    setIsLoading(false);
  }, [loadingKey]);

  function handleNavigateStart() {
    setIsLoading(true);
  }

  return (
    <CatalogLoader isLoading={isLoading}>
      <div className="py-6 md:py-8">
        <h1 className="text-xl md:text-3xl font-bold text-cta-stroke-primary mb-4">
          Top Sellers
        </h1>

        <GenreFilter
          selected={genre}
          filters={availableFilters}
          onNavigateStart={handleNavigateStart}
        />
      </div>

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
