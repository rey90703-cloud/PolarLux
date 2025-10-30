export interface RefrigeratorProduct {
  id: string;
  modelName: string;
  name: string;
  capacity: number;
  capacityUnit: string;
  image: string;
  description: string;
  price: number;
  priceFormatted: string;
  energyRating: string;
  color: string[];
  specs: string[];
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface RefrigeratorCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  series: string;
  products: RefrigeratorProduct[];
}

export interface RefrigeratorData {
  categories: RefrigeratorCategory[];
  metadata: {
    version: string;
    lastUpdated: string;
    currency: string;
    brand: string;
    country: string;
    totalProducts: number;
    description: string;
  };
}
