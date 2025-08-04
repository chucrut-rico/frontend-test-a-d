import { GamesResponse } from "@/types/game";

export async function getGames(
  genre: string | null,
  page: number
): Promise<GamesResponse> {
  const params = new URLSearchParams();
  if (genre) params.append("genre", genre);
  params.append("page", page.toString());

  const baseUrl = process.env.API_BASE_URL;

  const res = await fetch(`${baseUrl}/api/games?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}
