
import { useCart } from "@/providers/CartProvider";
import { formatPrice } from "@/data/products";

export default function OrderSummary() {
  const { cart, totalItems, totalPrice } = useCart();
  
  // Calculate shipping cost (free above certain threshold)
  const shippingThreshold = 500000; // 5 lakh INR
  const shippingCost = totalPrice >= shippingThreshold ? 0 : 5000; // 5,000 INR for shipping
  
  // Apply tax (18% GST)
  const taxRate = 0.18;
  const taxAmount = totalPrice * taxRate;
  
  // Calculate grand total
  const grandTotal = totalPrice + shippingCost + taxAmount;

  return (
    <div className="bg-muted/30 p-6 rounded-lg space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Order Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
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
        <div className="flex justify-between font-semibold">
          <span>Grand Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>
      
      <div className="space-y-2 text-xs text-muted-foreground pt-4">
        <p>* All prices are inclusive of GST.</p>
        <p>* Shipping time: 3-5 business days</p>
      </div>
    </div>
  );
}
