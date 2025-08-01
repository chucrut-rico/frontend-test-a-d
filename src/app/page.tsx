import CatalogContent from "@/components/CatalogContent";
import { GamesResponse } from "@/types/game";

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

  const data = await getGames(genre, page);

  return (
    <CatalogContent
      genre={genre}
      page={page}
      games={data.games}
      availableFilters={data.availableFilters}
      totalPages={data.totalPages}
      currentPage={data.currentPage}
    />
  );
}
