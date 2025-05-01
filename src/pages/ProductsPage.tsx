
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import ProductCard from "@/components/Products/ProductCard";
import ProductFilter from "@/components/Products/ProductFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { Product, FilterState } from "@/types";

export default function ProductsPage() {
  const [allProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    categories: [],
    brands: [],
    inStock: false,
    onSale: false,
    sortBy: "",
  });
  
  const [minMaxPrice, setMinMaxPrice] = useState<[number, number]>([0, 0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();

  // Calculate min and max price from products
  useEffect(() => {
    const prices = allProducts.map((product) => product.price);
    setMinMaxPrice([Math.min(...prices), Math.max(...prices)]);
  }, [allProducts]);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: FilterState = { ...activeFilters };
    
    const category = params.get("category");
    if (category) {
      newFilters.categories = [category];
    }
    
    const brand = params.get("brand");
    if (brand) {
      newFilters.brands = [brand];
    }
    
    const onSale = params.get("sale");
    if (onSale === "true") {
      newFilters.onSale = true;
    }
    
    setActiveFilters(newFilters);
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let result = [...allProducts];

    // Filter by price
    if (activeFilters.minPrice !== null) {
      result = result.filter((product) => product.price >= activeFilters.minPrice!);
    }
    if (activeFilters.maxPrice !== null) {
      result = result.filter((product) => product.price <= activeFilters.maxPrice!);
    }

    // Filter by categories
    if (activeFilters.categories.length > 0) {
      result = result.filter((product) =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Filter by brands
    if (activeFilters.brands.length > 0) {
      result = result.filter((product) =>
        activeFilters.brands.includes(product.brand)
      );
    }

    // Filter by stock
    if (activeFilters.inStock) {
      result = result.filter((product) => product.stockStatus === "In Stock");
    }

    // Filter by sale
    if (activeFilters.onSale) {
      result = result.filter((product) => product.onSale);
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      switch (activeFilters.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [activeFilters, allProducts]);

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 page-transition">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Mobile Filter Toggle */}
          <div className="w-full md:hidden mb-4">
            <Button onClick={toggleFilters} className="w-full">
              {isFilterOpen ? "Hide Filters" : "Show Filters"} ({filteredProducts.length} Products)
            </Button>
          </div>

          {/* Filter Sidebar - Desktop always visible, Mobile toggleable */}
          <div className={`
            md:w-1/4 md:block transition-all duration-300 ease-in-out
            ${isFilterOpen ? 'block' : 'hidden'}
          `}>
            <ProductFilter 
              onFilterChange={handleFilterChange}
              minMaxPrice={minMaxPrice}
              initialFilters={activeFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            {/* Active Filters Display */}
            {(activeFilters.categories.length > 0 || 
              activeFilters.brands.length > 0 || 
              activeFilters.inStock || 
              activeFilters.onSale) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active Filters:</span>
                  
                  {activeFilters.categories.map(category => (
                    <div key={category} className="bg-muted rounded-full py-1 px-3 text-xs flex items-center">
                      {category}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-1 p-0 h-4 w-4 rounded-full"
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          categories: prev.categories.filter(c => c !== category)
                        }))}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </div>
                  ))}
                  
                  {activeFilters.brands.map(brand => (
                    <div key={brand} className="bg-muted rounded-full py-1 px-3 text-xs flex items-center">
                      {brand}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-1 p-0 h-4 w-4 rounded-full"
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          brands: prev.brands.filter(b => b !== brand)
                        }))}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </div>
                  ))}
                  
                  {activeFilters.inStock && (
                    <div className="bg-muted rounded-full py-1 px-3 text-xs flex items-center">
                      In Stock
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-1 p-0 h-4 w-4 rounded-full"
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          inStock: false
                        }))}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </div>
                  )}
                  
                  {activeFilters.onSale && (
                    <div className="bg-muted rounded-full py-1 px-3 text-xs flex items-center">
                      On Sale
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-1 p-0 h-4 w-4 rounded-full"
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          onSale: false
                        }))}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                All Bikes
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ({filteredProducts.length} products)
                </span>
              </h2>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
