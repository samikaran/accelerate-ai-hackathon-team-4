import { NextResponse } from "next/server";
import cluster0 from "@/app/data/customer_cluster_0_df.json";
import cluster1 from "@/app/data/customer_cluster_1_df.json";
import cluster2 from "@/app/data/customer_cluster_2_df.json";
import cluster3 from "@/app/data/customer_cluster_3_df.json";
import cluster4 from "@/app/data/customer_cluster_4_df.json";
import featureData from "@/app/data/customer_feature_importance.json";
import productData from "@/app/data/product_df.json";
import transactionData from "@/app/data/transaction_df.json";

export async function GET() {
  try {
    return NextResponse.json({
      clusters: {
        cluster0,
        cluster1,
        cluster2,
        cluster3,
        cluster4,
      },
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
