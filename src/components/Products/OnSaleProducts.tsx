
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { getSaleProducts } from "@/data/products";
import { Product } from "@/types";

export default function OnSaleProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getSaleProducts());
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
            <p className="text-muted-foreground mt-2">
              Limited time deals on select motorcycles
            </p>
          </div>
          <Link to="/products?sale=true">
            <Button variant="outline">View All Offers</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
