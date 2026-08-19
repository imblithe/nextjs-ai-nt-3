"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "@/components/logo";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const columns = [
  {
    title: "ร้านค้า",
    links: [
      { label: "สินค้าทั้งหมด", href: "/product" },
      { label: "หลักสูตร", href: "/course" },
      { label: "ตะกร้าสินค้า", href: "/cart" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "ติดต่อเรา", href: "/contact" },
    ],
  },
  {
    title: "บัญชี",
    links: [
      { label: "เข้าสู่ระบบ", href: "/login" },
      { label: "สมัครสมาชิก", href: "/signup" },
    ],
  },
];

export default function AppFooter() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              ร้านค้าออนไลน์สไตล์แฟชั่นและไลฟ์สไตล์ สินค้าคุณภาพ ราคาโดนใจ
              พร้อมส่งถึงมือคุณ
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-primary" /> contact@shopvibe.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-primary" /> 02-123-4567
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> กรุงเทพมหานคร,
                ประเทศไทย
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.08em]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} ShopVibe · E-Commerce COSCI</p>
          <p className="flex items-center gap-1.5">
            <Zap className="size-4 fill-primary text-primary" />
            Designed with <span className="font-bold text-primary">Vibe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}