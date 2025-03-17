export interface ProductsQueryParams {
  page_index: number;
  page_size: number;
  keywords?: string;
  category_id?: number;
  brand?: string;
  rating?: number;
  price_min?: number;
  price_max?: number;
  sort_by?: string;
  sort_direction?: string;
}
