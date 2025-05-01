
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url(/placeholder.svg)" }}
      ></div>
      <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover Your Dream Motorcycle in India
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Premium bikes, exceptional service, and nationwide delivery. Your journey to the perfect ride starts here.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg">Explore Collection</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
