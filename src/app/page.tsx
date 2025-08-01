import GameCard from "@/components/GameCard";
import GenreFilter from "@/components/GenreFilter";
import LoadMoreButton from "@/components/LoadMoreButton";
import { GamesResponse } from "@/types/game";
import Image from "next/image";

async function getGames(
  genre: string | null,
  page: number
): Promise<GamesResponse> {
  const params = new URLSearchParams();
  if (genre) params.append("genre", genre);
  params.append("page", page.toString());

  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/games?${params}`);

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { genre?: string; page?: string };
}) {
  const genre = searchParams.genre || null;
  const page = parseInt(searchParams.page || "1");

  const { games, availableFilters, totalPages, currentPage } = await getGames(
    genre,
    page
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Game Catalog</h1>

      <GenreFilter selected={genre} filters={availableFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <LoadMoreButton currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
