/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  courses: any[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Learn
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          เรียนจบไว ใช้ได้จริง เริ่มต้นได้ตั้งแต่วันนี้
        </p>
      </div>

      <div className="mt-12 grid w-full gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-subtle ring-1 ring-border transition-all duration-200 hover:-translate-y-1.5 hover:shadow-product-hover hover:ring-primary/30"
            key={course.title}
          >
            <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
              <Image
                alt={course.title}
                className="size-full object-cover transition duration-300 group-hover:scale-105"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={course.picture}
                loading="eager"
              />
              <span className="absolute left-3 top-3 rounded-full bg-tertiary px-2.5 py-1 text-xs font-bold text-tertiary-foreground">
                ยอดนิยม
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Clock className="size-3.5 text-primary" />
                เรียนออนไลน์ · ไม่จำกัดเวลา
              </span>
              <h3 className="mt-2 font-heading text-[22px] font-semibold leading-snug">
                {course.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
                {course.detail}
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href="/contact"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-[#C026D3]"
                >
                  ลงทะเบียนเรียน
                  <ArrowRight className="size-4 transition group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCourse;