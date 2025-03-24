export interface ResCart {
  createdAt: string;
  products: ResCartProducts[];
  total: ResCartTotal;
  userId: string;
  _id: string;
}

export interface ResCartProducts {
  beforeDiscountPrice: number;
  pricePerQuantity: number;
  productId: string;
  quantity: number;
}

export interface ResCartTotal {
  price: ResCartTotalPrice;
  products: number;
  quantity: number;
}
export interface ResCartTotalPrice {
  current: number;
  beforeDiscount: number;
}
export interface AddProductToCartDto {
  id: string;
  quantity: number;
}
export interface ProductIdDto {
  id: string;
}
