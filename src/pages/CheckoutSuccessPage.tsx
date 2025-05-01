
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = "INB" + Math.floor(100000 + Math.random() * 900000);
  
  // Simulate order date
  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-24 page-transition">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Your order has been received and is now being processed.
          </p>
          
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-medium">{orderDate}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <p>
              We've sent a confirmation email with your order details and tracking information.
            </p>
            <p>
              Your bike will be delivered within 3-5 business days. Our team will contact you before delivery.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="default" size="lg">
                Return to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
