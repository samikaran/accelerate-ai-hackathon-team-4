export interface FeedbackData {
  month: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface CACData {
  month: string;
  cac: number;
  customers: number;
  totalCost: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}
