
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { useCart } from "@/providers/CartProvider";
import { OrderDetails } from "@/types";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleCheckout = (details: OrderDetails) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment successful! Your order has been placed.");
      clearCart();
      navigate("/checkout/success");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 page-transition">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleCheckout} isProcessing={isProcessing} />
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
}
