import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const items = [
  {
    icon: MapPin,
    title: "ที่อยู่",
    detail: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    icon: Mail,
    title: "อีเมล",
    detail: "contact@shopvibe.com",
  },
  {
    icon: Phone,
    title: "โทรศัพท์",
    detail: "02-123-4567",
  },
  {
    icon: Clock,
    title: "เวลาทำการ",
    detail: "จันทร์ - ศุกร์ 09:00 - 18:00 น.",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Contact
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
          ติดต่อเรา
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl bg-card p-6 shadow-subtle ring-1 ring-border"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <item.icon className="size-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}