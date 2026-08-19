import { ArrowRight, Sparkles, Truck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "โปรโมชัน", href: "/product" },
  { label: "สินค้าใหม่", href: "/product" },
  { label: "ขายดี", href: "/product" },
  { label: "เซตของขวัญ", href: "/product" },
  { label: "สินค้าราคาพิเศษ", href: "/product" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* announcement bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-(--breakpoint-xl) items-center justify-center gap-2 px-4 py-2 text-center text-sm font-semibold sm:px-6 lg:px-8">
          <Truck className="size-4" />
          ส่งฟรีทั่วประเทศ เมื่อสั่งซื้อครบ 999 บาท &nbsp;·&nbsp;
          <Sparkles className="size-4" /> ลดเพิ่ม 10% โค้ด VIBE10
        </div>
      </div>

      <div className="mx-auto grid max-w-(--breakpoint-xl) items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* copy */}
        <div className="relative z-10">
          <Badge
            asChild
            variant="ghost"
            className="w-fit px-3 py-1 text-tertiary-foreground shadow-none"
          >
            <Link href="/product">
              <Sparkles className="size-4 text-tertiary" />
              Mid-Season Sale กำลังเริ่มแล้ว
              <ArrowRight className="size-4" />
            </Link>
          </Badge>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-[0.02em] sm:text-5xl lg:text-[3.5rem]">
            ลดราคาแรง
            <br />
            สไตล์ใหม่ <span className="text-primary">จัดเต็ม</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            ค้นพบคอลเลกชันใหม่ล่าสุด สินค้าคุณภาพ ราคาโดนใจ พร้อมส่งถึงมือคุณ
            ภายใน 24 ชั่วโมง
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/product">
                ช้อปเลย <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/course">ดูหลักสูตร</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="size-4 fill-tertiary text-tertiary" />
              4.9
            </span>
            · กว่า 12,000+ รายการ · คืนสินค้าภายใน 30 วัน
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-tertiary/20 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl bg-card shadow-large ring-1 ring-border">
              <Image
                src="/product-image/airpods-pro.png"
                alt="AirPods Pro"
                width={400}
                height={500}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-xl bg-card shadow-large ring-1 ring-border">
              <Image
                src="/product-image/ipad-air.png"
                alt="iPad Air"
                width={400}
                height={500}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-lg bg-secondary px-4 py-2 font-heading text-sm font-bold text-secondary-foreground shadow-medium">
            ลดสูงสุด 50%
          </div>
          <div className="absolute -right-2 top-4 rounded-full bg-primary px-4 py-2 font-heading text-sm font-bold text-primary-foreground shadow-large">
            ใหม่ !
          </div>
        </div>
      </div>

      {/* category chips */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <span className="mr-1 text-sm font-semibold text-muted-foreground">
            ค้นหาตามหมวด:
          </span>
          {categories.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-full border-[1.5px] border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:bg-accent hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}