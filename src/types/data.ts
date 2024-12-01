export interface CustomerData {
  customer_id: number;
  age: number;
  gender: string;
  total_purchase_amount: number;
  location: string;
  total_purchases: number;
  is_subscriber: boolean;
  preferred_size: string;
  preferred_color: string;
  preferred_shipping: string;
  used_promo_code: boolean;
  preferred_payment_method: string;
  average_review_rating: number;
  average_purchase_amount: number;
  cluster: number;
}

export interface FeatureData {
  Feature: string;
  Importance: number;
}

export interface ProductData {
  item_purchased: string;
  color: string;
  category: string;
  average_purchase_amount: number;
  average_review_rating: number;
  has_discount: boolean;
  product_id: number;
}

export interface TransactionData {
  customer_id: number;
  age: number;
  gender: string;
  item_purchased: string;
  category: string;
  purchase_amount: number;
  location: string;
  size: string;
  color: string;
  season: string;
  review_rating: number;
  subscription_status: string;
  shipping_type: string;
  discount_applied: boolean;
  promo_code_used: boolean;
  previous_purchases: number;
  payment_method: string;
  frequency_of_purchases: string;
}

export interface AppData {
  clusters: {
    cluster0: CustomerData[];
    cluster1: CustomerData[];
    cluster2: CustomerData[];
  };
  featureData: FeatureData[];
  productData: ProductData[];
  transactionData: TransactionData[];
}
