import GenreFilter from "@/components/GenreFilter";
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

  const res = await fetch(`${baseUrl}/api/games?${params}`, {
    cache: "no-store",
  });

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
          <div key={game.id} className="border p-4 rounded shadow-sm">
            <Image width={100} height={100} src={game.image} alt={game.name} />
            <h2 className="text-lg font-semibold">{game.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{game.genre}</p>
            <p className="text-sm">{game.description}</p>
            <p className="font-semibold mt-2">${game.price}</p>
            {game.isNew && <span className="text-green-600 text-xs">New</span>}
          </div>
        ))}
      </div>
    </main>
  );
}
