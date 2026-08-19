import Hero from "@/components/hero";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const benefits = [
  { icon: Truck, title: "จัดส่งด่วน", desc: "ส่งภายใน 24 ชั่วโมง" },
  { icon: RotateCcw, title: "คืนได้ 30 วัน", desc: "ไม่ถูกใจคืนเงินทันที" },
  { icon: ShieldCheck, title: "ชำระปลอดภัย", desc: "ระบบเข้ารหัส 100%" },
  { icon: Headphones, title: "ดูแลตลอด 24ชม.", desc: "ทีมงานพร้อมช่วยเหลือ" },
];

// http://localhost:3000/
export default function Home() {
  return (
    <div>
      <Hero />

      {/* benefits strip */}
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-subtle ring-1 ring-border"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <b.icon className="size-5" />
              </span>
              <div>
                <p className="font-heading font-bold">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* promo banner */}
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[#C026D3] to-[#A21CAF] p-10 text-primary-foreground shadow-overlay sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] opacity-90">
              Limited Time
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">
              คอลเลกชันใหม่ มาแล้วจ้า
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/85">
              อย่าพลาดของดีราคาแรง ก่อนของหมดสต็อก รับโค้ดส่วนลดเพิ่มทันที
            </p>
          </div>
          <Link
            href="/product"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-tertiary px-6 py-3 font-heading font-bold text-tertiary-foreground shadow-medium transition hover:brightness-95"
          >
            ดูสินค้าลดราคา
            <ArrowRight className="size-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}