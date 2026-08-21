import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Contact us | COSCI",
  description: "ติดต่อร้าน COSCI สอบถามข้อมูลสินค้าและบริการ",
};

const contactItems = [
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
    href: undefined,
  },
  {
    icon: Phone,
    label: "เบอร์โทร",
    value: "02-123-4567",
    href: "tel:021234567",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "contact@cosci.com",
    href: "mailto:contact@cosci.com",
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์ - ศุกร์ 09:00 - 18:00 น.",
    href: undefined,
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "X (Twitter)", href: "https://x.com" },
  { name: "Line", href: "https://line.me" },
];

const faqs = [
  {
    question: "ใช้เวลานานเท่าไหร่ในการตอบกลับ?",
    answer:
      "เราจะตอบกลับภายใน 1-2 วันทำการ โดยทั่วไปเร็วกว่าสำหรับข้อความที่ส่งในช่วงเวลาทำการ",
  },
  {
    question: "สอบถามเรื่องการสั่งซื้อและจัดส่งได้ไหม?",
    answer:
      "ได้ครับ ส่งอีเมลพร้อมหมายเลขคำสั่งซื้อ (Order ID) เราจะช่วยตรวจสอบสถานะและตอบกลับโดยเร็วที่สุด",
  },
  {
    question: "สามารถขอใบกำกับภาษีหรือเอกสารอื่นได้ไหม?",
    answer:
      "ได้ครับ แจ้งรายละเอียดที่ต้องการ พร้อมข้อมูลบริษัทในข้อความ เราจะจัดเตรียมเอกสารให้",
  },
  {
    question: "ต้องการเปลี่ยนหรือคืนสินค้าติดต่อใคร?",
    answer:
      "ติดต่อทีมงานผ่านฟอร์มนี้หรืออีเมล โดยระบุหัวข้อเรื่องการคืนสินค้า พร้อมแนบหลักฐานการสั่งซื้อ",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-(--breakpoint-xl) px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
           Contact us
        </h1>
        <p className="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-xl">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน เรายินดีให้ความช่วยเหลือ
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="contact-info-heading" className="space-y-8">
          <h2
            id="contact-info-heading"
            className="sr-only"
          >
            ข้อมูลติดต่อ
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <div className="h-full rounded-xl border p-5">
                  <div className="flex items-center gap-2">
                    <Icon className="size-5 shrink-0 text-primary" />
                    <h3 className="font-medium">{label}</h3>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="mt-2 block text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-2 text-muted-foreground">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2">
              <Globe className="size-5 shrink-0 text-primary" />
              <h3 className="font-medium">Social</h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-3xl border bg-background px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="font-medium">คำถามที่พบบ่อย (FAQ)</h3>
            <div className="mt-3 space-y-2">
              {faqs.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-3xl border bg-background px-4 py-3"
                >
                  <summary className="cursor-pointer list-none text-sm font-medium [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {question}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Contact form">
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
