export interface BaseSearchDto {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}

export interface Product {
  price: Price;
  category: Category;
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
}

export interface Price {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
