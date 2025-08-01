"use client";

import { useEffect, useState } from "react";
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import CartItem from "@/components/CartItem";

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
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <p className="mb-4">
        <span className="font-semibold">{cartItems.length} items</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="border p-4 rounded shadow-sm bg-gray-50 h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <p className="mb-2">
            <span className="font-semibold">{cartItems.length} items</span>
          </p>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-700"
            >
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-md">
            <span>Total</span>
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
