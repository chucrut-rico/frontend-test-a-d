"use client";

import { useEffect, useState } from "react";
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Game[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const cart: Game[] = stored ? JSON.parse(stored) : [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Link href="/" className="flex items-center text-primary">
        <Image
          src={"/icons/arrow-left.svg"}
          width={24}
          height={24}
          alt="Back"
        />
        <span>Back to catalog</span>
      </Link>

      <h1 className="text-2xl font-bold mt-8">Your Cart</h1>
      <div className="mb-4 text-lg">
        <span>{cartItems.length} items</span>
      </div>

      <div className="md:flex">
        <div className="basis-7/12 md:mr-24">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
        </div>

        <div className="basis-5/12 border p-4 rounded-lg border border-stroke-secondary h-fit">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <p className="mb-6">
            <span>{cartItems.length} items</span>
          </p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-md">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="mt-4 w-full bg-cta-fill-primary text-white py-2 rounded-2xl">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
