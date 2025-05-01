
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";
import { getCategories, getBrands, getBrandWithCount, getCategoryWithCount } from "@/data/products";
import { FilterState, CategoryWithCount, BrandWithCount } from "@/types";

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  minMaxPrice: [number, number];
  initialFilters?: FilterState;
}

export default function ProductFilter({ onFilterChange, minMaxPrice, initialFilters }: ProductFilterProps) {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [brands, setBrands] = useState<BrandWithCount[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(minMaxPrice);
  
  const [filters, setFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    categories: [],
    brands: [],
    inStock: false,
    onSale: false,
    sortBy: "",
    ...(initialFilters || {})
  });

  useEffect(() => {
    setCategories(getCategoryWithCount());
    setBrands(getBrandWithCount());
  }, []);

  useEffect(() => {
    setPriceRange(minMaxPrice);
  }, [minMaxPrice]);

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters({
      ...filters,
      categories: checked 
        ? [...filters.categories, category]
        : filters.categories.filter(c => c !== category),
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters({
      ...filters,
      brands: checked 
        ? [...filters.brands, brand]
        : filters.brands.filter(b => b !== brand),
    });
  };

  const handleStockChange = (checked: boolean) => {
    setFilters({
      ...filters,
      inStock: checked,
    });
  };

  const handleSaleChange = (checked: boolean) => {
    setFilters({
      ...filters,
      onSale: checked,
    });
  };

  const handleSortChange = (value: string) => {
    setFilters({
      ...filters,
      sortBy: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      categories: [],
      brands: [],
      inStock: false,
      onSale: false,
      sortBy: "",
    });
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1"
          onClick={resetFilters}
        >
          <X className="h-3 w-3" /> Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Price Range</h4>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            min={minMaxPrice[0]}
            max={minMaxPrice[1]}
            step={1000}
            value={[
              filters.minPrice !== null ? filters.minPrice : minMaxPrice[0],
              filters.maxPrice !== null ? filters.maxPrice : minMaxPrice[1]
            ]}
            onValueChange={handlePriceChange}
            className="my-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>₹{filters.minPrice !== null ? filters.minPrice.toLocaleString() : minMaxPrice[0].toLocaleString()}</span>
            <span>₹{filters.maxPrice !== null ? filters.maxPrice.toLocaleString() : minMaxPrice[1].toLocaleString()}</span>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["categories", "brands"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.name}`}
                      checked={filters.categories.includes(category.name)}
                      onCheckedChange={(checked) => handleCategoryChange(category.name, checked === true)}
                    />
                    <label 
                      htmlFor={`category-${category.name}`}
                      className="text-sm flex-1 cursor-pointer flex justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">({category.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand.name}`}
                      checked={filters.brands.includes(brand.name)}
                      onCheckedChange={(checked) => handleBrandChange(brand.name, checked === true)}
                    />
                    <label 
                      htmlFor={`brand-${brand.name}`}
                      className="text-sm flex-1 cursor-pointer flex justify-between"
                    >
                      <span>{brand.name}</span>
                      <span className="text-muted-foreground">({brand.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div>
          <h4 className="font-medium text-sm mb-2">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => handleStockChange(checked === true)}
              />
              <label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => handleSaleChange(checked === true)}
              />
              <label htmlFor="on-sale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Sort By</h4>
          <select 
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
