
import { useEffect, useState } from "react";
import { getBrands } from "@/data/products";
import { Link } from "react-router-dom";

export default function BrandShowcase() {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    setBrands(getBrands());
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Top Brands
          </h2>
          <p className="text-muted-foreground">
            Discover bikes from the world's leading manufacturers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=${encodeURIComponent(brand)}`}
              className="flex items-center justify-center h-20 px-4 bg-background rounded-lg border hover:border-primary transition-colors shadow-sm card-hover"
            >
              <span className="font-medium">{brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
