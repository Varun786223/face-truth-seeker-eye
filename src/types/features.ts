
export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  problem: string;
  revenue: string;
  link: string;
  howItWorks?: string;
  icon?: React.ReactNode;
}

export type FeatureCategory = "detection" | "citizen-protection" | "revenue" | "government";

export type FeaturesByCategory = Record<string, Feature[]>;
