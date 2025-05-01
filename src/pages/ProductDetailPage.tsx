
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getProductById, formatPrice } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/providers/CartProvider";
import { ShoppingCart, ChevronLeft } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
      }
    }
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/products")}>View All Products</Button>
        </div>
      </Layout>
    );
  }

  const {
    name,
    price,
    category,
    brand,
    description,
    specs,
    image,
    onSale,
    discount,
    stockStatus,
    colors,
  } = product;

  const discountedPrice = onSale && discount ? price - price * (discount / 100) : price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 page-transition">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Bikes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products?category=${encodeURIComponent(category)}`}>
                {category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {onSale && discount && (
              <Badge className="absolute top-4 right-4 bg-primary">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{category}</Badge>
                <Link to={`/products?brand=${encodeURIComponent(brand)}`} className="text-sm text-muted-foreground hover:text-primary">
                  {brand}
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-baseline gap-2">
                  {onSale && discount ? (
                    <>
                      <span className="text-2xl font-bold">
                        {formatPrice(discountedPrice)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{formatPrice(price)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Availability:</span>
                <span
                  className={`text-sm ${
                    stockStatus === "In Stock"
                      ? "text-green-600"
                      : stockStatus === "Limited"
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {stockStatus}
                </span>
              </div>
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-sm font-medium block mb-2">Color:</span>
                  <div className="flex gap-2">
                    {colors?.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                        className="h-auto py-1 px-3"
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-2">
                <span className="text-sm font-medium block mb-2">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={stockStatus === "Out of Stock"}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full lg:w-auto"
                onClick={handleAddToCart}
                disabled={stockStatus === "Out of Stock"}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {stockStatus === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-4 border rounded-md space-y-4">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <p>
              We offer nationwide shipping for all our motorcycles. Delivery usually takes 3-5 business days depending on your location.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Shipping Terms:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Free shipping on orders above ₹5,00,000</li>
                <li>Standard shipping fee of ₹5,000 for orders below ₹5,00,000</li>
                <li>Motorcycles are shipped fully assembled and ready to ride</li>
                <li>Professional delivery team will explain all features and controls</li>
                <li>All necessary documentation will be provided during delivery</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="warranty" className="p-4 border rounded-md space-y-4">
            <h3 className="text-xl font-semibold mb-4">Warranty Information</h3>
            <p>
              All motorcycles purchased from India Bike Haven come with manufacturer warranty and our exclusive store warranty.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Warranty Coverage:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Standard manufacturer warranty (varies by brand)</li>
                <li>Additional 6-month India Bike Haven warranty</li>
                <li>Free service checkup within first 3 months</li>
                <li>Extended warranty options available for purchase</li>
                <li>Warranty includes parts and labor for covered repairs</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products Section would go here */}
      </div>
    </Layout>
  );
}
