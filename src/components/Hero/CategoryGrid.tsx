
import { Link } from "react-router-dom";
import { getCategories } from "@/data/products";
import { useState, useEffect } from "react";

export default function CategoryGrid() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Browse By Category
          </h2>
          <p className="text-muted-foreground">
            Find the perfect bike for your riding style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(category)}`}
              key={category}
              className="group relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
              <h3 className="text-lg md:text-xl font-semibold text-white relative z-10 text-center px-2">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
