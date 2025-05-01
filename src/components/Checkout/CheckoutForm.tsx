
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderDetails } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  onSubmit: (details: OrderDetails) => void;
  isProcessing: boolean;
}

export default function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const navigate = useNavigate();
  
  const [details, setDetails] = useState<OrderDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
    cardDetails: {
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("card.")) {
      const cardField = name.split(".")[1];
      setDetails({
        ...details,
        cardDetails: {
          ...details.cardDetails!,
          [cardField]: value,
        },
      });
    } else {
      setDetails({
        ...details,
        [name]: value,
      });
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setDetails({
      ...details,
      paymentMethod: value as "card" | "upi" | "cash",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!details.name || !details.email || !details.phone || !details.address || !details.city || !details.state || !details.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (details.paymentMethod === "card") {
      if (!details.cardDetails?.number || !details.cardDetails?.name || !details.cardDetails?.expiry || !details.cardDetails?.cvv) {
        toast.error("Please fill in all card details");
        return;
      }
      
      // Very basic card validation for demo
      if (details.cardDetails.number.replace(/\s/g, "").length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      
      if (details.cardDetails.cvv.length !== 3) {
        toast.error("Please enter a valid 3-digit CVV");
        return;
      }
    }
    
    if (details.paymentMethod === "upi" && !details.upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }
    
    onSubmit(details);
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={details.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={details.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={details.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Shipping Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              value={details.address}
              onChange={handleInputChange}
              placeholder="123 Street Name"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={details.city}
                onChange={handleInputChange}
                placeholder="Mumbai"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                value={details.state}
                onChange={handleInputChange}
                placeholder="Maharashtra"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input
                id="pincode"
                name="pincode"
                value={details.pincode}
                onChange={handleInputChange}
                placeholder="400001"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        
        <RadioGroup 
          defaultValue="card"
          value={details.paymentMethod} 
          onValueChange={handlePaymentMethodChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="payment-card" />
            <Label htmlFor="payment-card">Credit/Debit Card</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upi" id="payment-upi" />
            <Label htmlFor="payment-upi">UPI</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="payment-cash" />
            <Label htmlFor="payment-cash">Cash on Delivery</Label>
          </div>
        </RadioGroup>

        {details.paymentMethod === "card" && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  name="card.number"
                  value={details.cardDetails?.number || ""}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input
                  id="card-name"
                  name="card.name"
                  value={details.cardDetails?.name || ""}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiry Date</Label>
                <Input
                  id="card-expiry"
                  name="card.expiry"
                  value={details.cardDetails?.expiry || ""}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-cvv">CVV</Label>
                <Input
                  id="card-cvv"
                  name="card.cvv"
                  value={details.cardDetails?.cvv || ""}
                  onChange={handleInputChange}
                  type="password"
                  maxLength={3}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}
        
        {details.paymentMethod === "upi" && (
          <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input
              id="upi-id"
              name="upiId"
              value={details.upiId || ""}
              onChange={handleInputChange}
              placeholder="example@upi"
            />
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
}
