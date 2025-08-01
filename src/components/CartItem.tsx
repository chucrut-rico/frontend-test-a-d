"use client";

import { Game } from "@/utils/endpoint";
import Image from "next/image";

interface CartItemProps {
  item: Game;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 border p-4 rounded relative bg-white shadow-sm">
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 text-sm text-red-600 font-bold"
        aria-label="Remove from cart"
      >
        X
      </button>

      <Image
        src={item.image}
        alt={item.name}
        width={100}
        height={100}
        className="rounded"
      />

      <div>
        <div className="text-sm text-gray-600 font-semibold">
          {item.genre}
          {item.isNew && (
            <span className="ml-2 text-xs text-green-600 font-bold border border-green-600 px-1 py-0.5 rounded">
              New
            </span>
          )}
        </div>
        <h2 className="font-bold text-lg">{item.name}</h2>
        <p className="text-sm text-gray-700 mb-1">{item.description}</p>
        <p className="text-md font-semibold">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
