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

export interface FeatureImportance {
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

export const parseCustomerData = (data: string): CustomerData[] => {
  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const customer: any = {};
    headers.forEach((header, index) => {
      let value = values[index];
      if (value === "True") value = true;
      if (value === "False") value = false;
      if (!isNaN(Number(value))) value = Number(value);
      customer[header] = value;
    });
    return customer as CustomerData;
  });
};

export const parseFeatureImportance = (data: string): FeatureImportance[] => {
  const lines = data.trim().split("\n");
  return lines.slice(1).map((line) => {
    const [Feature, Importance] = line.split(",");
    return {
      Feature,
      Importance: Number(Importance),
    };
  });
};

export const parseProductData = (data: string): ProductData[] => {
  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const product: any = {};
    headers.forEach((header, index) => {
      let value = values[index];
      if (value === "True") value = true;
      if (value === "False") value = false;
      if (!isNaN(Number(value))) value = Number(value);
      product[header] = value;
    });
    return product as ProductData;
  });
};

// Utility functions to calculate aggregated data
export const getCustomerDemographics = (customers: CustomerData[]) => {
  const genderCount = customers.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(genderCount).map(([segment, value]) => ({
    segment,
    value: (value / customers.length) * 100,
  }));
};

export const getProductPerformance = (products: ProductData[]) => {
  const categoryData = products.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {
        totalPrice: 0,
        totalRating: 0,
        count: 0,
      };
    }
    acc[curr.category].totalPrice += curr.average_purchase_amount;
    acc[curr.category].totalRating += curr.average_review_rating;
    acc[curr.category].count += 1;
    return acc;
  }, {} as Record<string, { totalPrice: number; totalRating: number; count: number }>);

  return Object.entries(categoryData).map(([category, data]) => ({
    category,
    avgPrice: Number((data.totalPrice / data.count).toFixed(2)),
    avgRating: Number((data.totalRating / data.count).toFixed(2)),
    sales: data.count,
  }));
};
