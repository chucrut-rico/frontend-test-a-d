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
    <div className="rounded-xl border border-stroke-secondary px-6 py-5 flex flex-col gap-2 relative">
      {game.isNew && (
        <span className="text-xs px-2 py-1.5 bg-stone-100 absolute top-8 left-8 rounded">
          New
        </span>
      )}

      <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          width={300}
          height={200}
          className="object-cover w-full h-full"
          src={game.image}
          alt={game.name}
        />
      </div>

      <div className="font-medium uppercase text-secondary">{game.genre}</div>
      <div className="flex items-start justify-between w-full pb-1">
        <div className="font-medium">{game.name}</div>
        <div className="font-semibold ml-2">${game.price}</div>
      </div>

      <button
        onClick={handleToggleCart}
        className={`mt-auto px-3 py-3 uppercase rounded-lg border border-cta-stroke-primary font-semibold`}
      >
        {inCart ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
}
