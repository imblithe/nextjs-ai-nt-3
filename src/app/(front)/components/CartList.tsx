"use client"

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(price);

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-accent text-primary">
          <ShoppingBag className="size-9" />
        </span>
        <h1 className="mt-6 font-heading text-2xl font-bold">
          ตะกร้าสินค้าว่างเปล่า
        </h1>
        <p className="mt-2 text-muted-foreground">
          ยังไม่มีสินค้าในตะกร้า ลองเลือกซื้อสินค้าที่ชอบดูสิ
        </p>
        <Button
          asChild
          className="mt-6 rounded-full px-8"
          onClick={() => router.replace("/product")}
        >
          <span>เริ่มช้อปปิ้ง</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-3xl font-bold">ตะกร้าสินค้า</h1>
        <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-primary">
          {items.length} รายการ
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <div className="space-y-4">
          {items.map((i) => (
            <div
              key={i.productId}
              className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-subtle ring-1 ring-border"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent font-heading font-bold text-primary">
                {i.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading font-semibold">{i.name}</p>
                <p className="text-sm text-muted-foreground">
                  รหัส: {i.productId} · ราคา {formatPrice(i.price)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">จำนวน</p>
                <p className="font-heading font-bold">x{i.qty}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">รวม</p>
                <p className="font-heading font-bold text-primary">
                  {formatPrice(i.price * i.qty)}
                </p>
              </div>
              <Button
                variant="destructive"
                className="shrink-0 rounded-full"
                onClick={() => removeItem(i.productId)}
                aria-label="ลบสินค้า"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="ghost"
            className="text-destructive hover:bg-red-50 hover:text-destructive"
            onClick={() => clearCart()}
          >
            ลบสินค้าทั้งหมด
          </Button>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl bg-card p-6 shadow-medium ring-1 ring-border">
          <h2 className="font-heading text-xl font-bold">สรุปคำสั่งซื้อ</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">สินค้ารวม</dt>
              <dd className="font-semibold">{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">ค่าจัดส่ง</dt>
              <dd className="font-bold text-secondary-foreground">
                {totalPrice >= 999 ? "ฟรี" : "฿50"}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-heading font-bold">รวมทั้งหมด</dt>
              <dd className="font-heading text-xl font-extrabold text-primary">
                {formatPrice(totalPrice + (totalPrice >= 999 ? 0 : 50))}
              </dd>
            </div>
          </dl>

          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-full"
            onClick={() => {
              clearCart();
              router.replace("/product");
            }}
          >
            <span>
              ยืนยันการสั่งซื้อ <ArrowRight className="size-5" />
            </span>
          </Button>
          <Button
            asChild
            variant="outline"
            className="mt-3 w-full rounded-full border-primary/50 text-primary hover:bg-accent hover:text-primary"
            onClick={() => router.replace("/product")}
          >
            <span>เลือกสินค้าเพิ่ม</span>
          </Button>
        </aside>
      </div>
    </div>
  );
}