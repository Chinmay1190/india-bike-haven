
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/providers/CartProvider";
import { formatPrice } from "@/data/products";
import { X, ShoppingCart, MinusCircle, PlusCircle } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  // Calculate shipping cost (free above certain threshold)
  const shippingThreshold = 500000; // 5 lakh INR
  const shippingCost = totalPrice >= shippingThreshold ? 0 : 5000; // 5,000 INR for shipping
  
  // Apply tax (18% GST)
  const taxRate = 0.18;
  const taxAmount = totalPrice * taxRate;
  
  // Calculate grand total
  const grandTotal = totalPrice + shippingCost + taxAmount;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12 text-center page-transition">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any bikes to your cart yet.
            </p>
            <Link to="/products">
              <Button>Browse Bikes</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 page-transition">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        <Link to={`/products/${item.product.id}`}>
                          <div className="w-16 h-16 rounded bg-muted overflow-hidden">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/products/${item.product.id}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {item.product.brand}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.product.onSale && item.product.discount ? (
                          <div className="space-y-1">
                            <div className="font-medium">
                              {formatPrice(item.product.price - (item.product.price * (item.product.discount / 100)))}
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.product.price)}
                            </div>
                          </div>
                        ) : (
                          <div className="font-medium">
                            {formatPrice(item.product.price)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.product.onSale && item.product.discount ? (
                          formatPrice(
                            (item.product.price - (item.product.price * (item.product.discount / 100))) * item.quantity
                          )
                        ) : (
                          formatPrice(item.product.price * item.quantity)
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="outline" onClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h2 className="font-semibold text-lg border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Free shipping on orders above {formatPrice(shippingThreshold)}
                  </div>
                )}
              </div>

              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-4"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <div className="space-y-2 text-xs text-muted-foreground pt-4">
                <p>* All prices are inclusive of GST.</p>
                <p>* Shipping time: 3-5 business days</p>
                <p>* Free shipping on orders above ₹5,00,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
