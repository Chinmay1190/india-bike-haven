
import { ShieldCheck, Truck, Clock, CreditCard } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Why Choose India Bike Haven
          </h2>
          <p className="text-muted-foreground">
            We provide the best motorcycle shopping experience in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="p-6 bg-background rounded-lg shadow-sm flex flex-col items-center text-center card-hover">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Authentic</h3>
            <p className="text-muted-foreground text-sm">
              Every bike we sell is 100% authentic with proper documentation and warranty.
            </p>
          </div>

          <div className="p-6 bg-background rounded-lg shadow-sm flex flex-col items-center text-center card-hover">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Pan India Delivery</h3>
            <p className="text-muted-foreground text-sm">
              We deliver to all major cities across India with proper handling and care.
            </p>
          </div>

          <div className="p-6 bg-background rounded-lg shadow-sm flex flex-col items-center text-center card-hover">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-muted-foreground text-sm">
              Multiple secure payment options including EMI and online payments.
            </p>
          </div>

          <div className="p-6 bg-background rounded-lg shadow-sm flex flex-col items-center text-center card-hover">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Timely Support</h3>
            <p className="text-muted-foreground text-sm">
              24/7 customer support to address all your queries and concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
