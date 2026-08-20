/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";

type Props = {
  products: any[]
}

const FeaturesProduct = ({ products }: Props) => {
  const categories: Record<string, any[]> = {};

  const fallbackImages: Record<string, string> = {
    Audio: "airpods-pro.png",
    Mobile: "galaxy-s24.png",
    Tablet: "ipad-air.png",
    Laptop: "macbook-air.png",
    Other: "globe.svg",
  };

  products.forEach((product) => {
    const imageName = product.images?.[0]?.image_name || "";
    let category = "Other";

    if (imageName.includes("airpods")) category = "Audio";
    else if (imageName.includes("galaxy")) category = "Mobile";
    else if (imageName.includes("ipad")) category = "Tablet";
    else if (imageName.includes("macbook")) category = "Laptop";
    else if (product.name.toLowerCase().includes("airpods")) category = "Audio";
    else if (product.name.toLowerCase().includes("galaxy") || product.name.toLowerCase().includes("phone")) category = "Mobile";
    else if (product.name.toLowerCase().includes("ipad") || product.name.toLowerCase().includes("tablet")) category = "Tablet";
    else if (product.name.toLowerCase().includes("macbook") || product.name.toLowerCase().includes("laptop")) category = "Laptop";

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(product);
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-6 py-20">
      <h2 className="text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
        สินค้าทั้งหมด
      </h2>

      {Object.entries(categories).map(([category, categoryProducts]) => (
        <div key={category} className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 border-l-4 border-primary pl-4">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => {
              const hasImage = product.images && product.images.length > 0;
              const imageSrc = hasImage 
                ? `/product-image/${product.images[0].image_name}` 
                : `/product-image/${fallbackImages[category] || fallbackImages.Other}`;

              return (
                <div className="rounded-xl border bg-card px-6 py-7" key={product.id}>

                  <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-xl sm:mb-6">
                      <Image
                        alt={product.name}
                        className="size-full bg-muted object-cover"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={imageSrc}
                        loading="eager"
                      />
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-primary/15">
                    ID: {product.id}
                  </div>
                  <h3 className="mt-5 font-medium text-lg tracking-[-0.005em]">
                    Name: {product.name}
                  </h3>
                  <p className="mt-2 text-base text-foreground/70">
                    Price: {product.price.toString()}
                  </p>
                  <div className="mt-2">
                      <CartButton product={product} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesProduct;
