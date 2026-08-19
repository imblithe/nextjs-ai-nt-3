/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  products: any[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(price);

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
            Shop Now
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            สินค้าทั้งหมด
          </h2>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const original = product.price * 1.25;
          return (
            <div
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-subtle ring-1 ring-border transition-all duration-200 hover:-translate-y-1.5 hover:shadow-product-hover hover:ring-primary/30"
              key={product.id}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
                <Image
                  alt={product.name}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src={`/product-image/${product.picture}`}
                  loading="eager"
                />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">
                  SALE
                </span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-xs font-semibold shadow-sm">
                  <Star className="size-3.5 fill-tertiary text-tertiary" />
                  4.8
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="font-heading text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                  ID #{product.id}
                </p>
                <h3 className="mt-1 line-clamp-1 font-heading text-lg font-semibold">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-heading text-xl font-extrabold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground line-through">
                    {formatPrice(Math.round(original))}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <CartButton product={product} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesProduct;