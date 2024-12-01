import { NextResponse } from "next/server";
import customerData from "@/app/data/customer_cluster_0_df.json";
import featureData from "@/app/data/customer_feature_importance.json";
import productData from "@/app/data/product_df.json";
import transactionData from "@/app/data/transaction_df.json";

export async function GET() {
  try {
    return NextResponse.json({
      customerData,
      featureData,
      productData,
      transactionData,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to serve data" },
      { status: 500 }
    );
  }
}
