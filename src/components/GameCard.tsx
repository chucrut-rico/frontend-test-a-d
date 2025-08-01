"use client";

import { Game } from "@/utils/endpoint";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const cart: Game[] = stored ? JSON.parse(stored) : [];
    const found = cart.find((item) => item.id === game.id);
    setInCart(!!found);
  }, [game.id]);

  const handleToggleCart = () => {
    const stored = localStorage.getItem("cart");
    const cart: Game[] = stored ? JSON.parse(stored) : [];

    if (inCart) {
      const updatedCart = cart.filter((item) => item.id !== game.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(false);
    } else {
      const updatedCart = [...cart, game];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(true);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm flex flex-col gap-2">
      <Image width={100} height={100} src={game.image} alt={game.name} />

      <div className="font-semibold text-gray-600">{game.genre}</div>
      <div className="font-semibold">{game.name}</div>
      <p className="font-semibold">${game.price}</p>

      <button
        onClick={handleToggleCart}
        className={`mt-2 px-3 py-1 text-sm rounded 
          ${inCart ? "bg-red-600 hover:bg-red-700 text-white" : ""} 
          `}
      >
        {inCart ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
}
