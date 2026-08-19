/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";

export default function CartButton({ product }: any) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddItem = () => {
    addItem({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <button
      onClick={handleAddItem}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-medium transition hover:bg-[#C026D3] active:translate-y-px active:bg-[#A21CAF]"
    >
      <ShoppingBag className="size-4" />
      หยิบใส่ตะกร้า
    </button>
  );
}