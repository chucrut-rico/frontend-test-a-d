"use client";

import { Game } from "@/utils/endpoint";
import Image from "next/image";

interface CartItemProps {
  item: Game;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="px-4 md:px-6 py-7 pr-10 md:pr-6 flex flex-col gap-2 relative border-b border-cta-stroke-primary last:border-b-0">
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-6 md:top-7 right-2 text-sm text-red-600 font-bold"
        aria-label="Remove from cart"
      >
        <Image src={"/icons/close.svg"} width={24} height={24} alt="Remove" />
      </button>

      {item.isNew && (
        <span className="text-xs px-2 py-1.5 bg-stone-100 absolute top-8 left-8">
          New
        </span>
      )}

      <div className="md:flex">
        <div className="basis-2/6 md:w-4/12 aspect-[16/9] flex-none overflow-hidden mb-2 md:mr-4">
          <Image
            width={300}
            height={200}
            className="object-cover w-full h-full"
            src={item.image}
            alt={item.name}
          />
        </div>

        <div className="relative pb-10">
          <div className="font-medium uppercase text-stroke-secondary">
            {item.genre}
          </div>
          <div>
            <div className="font-medium text-xl my-2">{item.name}</div>
            <div className="text-neutral-500">{item.description}</div>
            <div className="font-semibold absolute -right-6 md:right-0 bottom-0">
              ${item.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
