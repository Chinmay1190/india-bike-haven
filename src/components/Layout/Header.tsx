
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, ShoppingCart, Sun, Moon, Menu, X, IndianRupee, Search } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <IndianRupee className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">India Bike Haven</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Bikes
            </Link>
            <Link
              to="/brands"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Brands
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search bikes..."
                className="w-[200px] rounded-full"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Theme Toggler */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Cart Button */}
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="py-2 md:hidden">
            <Input
              type="search"
              placeholder="Search bikes..."
              className="w-full rounded-full"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bikes
              </Link>
              <Link
                to="/brands"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  toggleSearch();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
