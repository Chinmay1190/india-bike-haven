
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, category, brand, image, onSale, discount, stockStatus } = product;
  const { addToCart } = useCart();

  const discountedPrice = onSale && discount ? price - (price * (discount / 100)) : price;
  
  const stockStatusColor = {
    "In Stock": "bg-green-500",
    "Limited": "bg-amber-500",
    "Out of Stock": "bg-red-500"
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md card-hover">
      <Link to={`/products/${id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transform transition-transform hover:scale-105"
          />
        </div>
        {onSale && discount && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {discount}% OFF
          </Badge>
        )}
      </Link>
      <CardContent className="py-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{category}</Badge>
          <span className="text-xs">{brand}</span>
        </div>
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-semibold text-lg truncate mb-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {onSale && discount ? (
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatPrice(discountedPrice)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="font-bold">{formatPrice(price)}</span>
            )}
          </div>
          <div className={`h-2 w-2 rounded-full ${stockStatusColor[stockStatus]}`} title={stockStatus} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full" 
          onClick={() => addToCart(product)}
          disabled={stockStatus === "Out of Stock"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {stockStatus === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
