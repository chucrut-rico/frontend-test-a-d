import CatalogContent from "@/components/CatalogContent";
import { getGames } from "@/services/games";

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
