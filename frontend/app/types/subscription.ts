
export type BillingCycle =
  | "MONTHLY"
  | "YEARLY"
  | "WEEKLY";

export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELLED";

export type Category =
  | "TECH"
  | "DESIGN"
  | "MARKETING"
  | "PRODUCTIVITY"
  | "AI"
  | "ENTERTAINMENT"
  | "OTHER";

export default interface Subscription {
  id: number;
  name: string;
  plan: string | null;
  cost: number;
  startDate: string;
  endDate: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  category: Category;
}