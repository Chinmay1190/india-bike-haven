
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { Product } from "@/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getFeaturedProducts());
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Bikes</h2>
            <p className="text-muted-foreground mt-2">
              Explore our handpicked selection of premium motorcycles
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">View All Bikes</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
