import { Game } from "@/utils/endpoint";
import Image from "next/image";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <Image width={100} height={100} src={game.image} alt={game.name} />

      <h2 className="text-lg font-semibold">{game.name}</h2>
      <p className="text-sm text-gray-600 mb-1">{game.genre}</p>
      <p className="text-sm">{game.description}</p>
      <p className="font-semibold mt-2">${game.price}</p>
      {game.isNew && <span className="text-green-600 text-xs">New</span>}
    </div>
  );
}
