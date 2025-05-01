
import { Link } from "react-router-dom";
import { IndianRupee, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <IndianRupee className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                India Bike Haven
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Your premier destination for high-performance motorcycles in India.
              Quality bikes, transparent pricing, and exceptional customer service.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Bikes
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">
                123 Bike Street, Mumbai
              </p>
              <p className="text-sm text-muted-foreground mb-2">Maharashtra, India</p>
              <p className="text-sm text-muted-foreground mb-2">
                Phone: +91 98765 43210
              </p>
              <p className="text-sm text-muted-foreground">
                Email: info@indiasbikehaven.com
              </p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {year} India Bike Haven. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Designed & Developed by Lovable AI
          </p>
        </div>
      </div>
    </footer>
  );
}
