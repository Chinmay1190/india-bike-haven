
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  description: string;
  specs: {
    engine?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    weight?: string;
    fuelCapacity?: string;
    topSpeed?: string;
    [key: string]: string | undefined;
  };
  featured?: boolean;
  onSale?: boolean;
  discount?: number;
  stockStatus: "In Stock" | "Limited" | "Out of Stock";
  colors?: string[];
};

export type OrderDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "card" | "upi" | "cash";
  cardDetails?: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
  upiId?: string;
};

export type Order = {
  id: string;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  details: OrderDetails;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
};

export type CategoryWithCount = {
  name: string;
  count: number;
};

export type BrandWithCount = {
  name: string;
  count: number;
};

export type FilterState = {
  minPrice: number | null;
  maxPrice: number | null;
  categories: string[];
  brands: string[];
  inStock: boolean;
  onSale: boolean;
  sortBy: "" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
};
