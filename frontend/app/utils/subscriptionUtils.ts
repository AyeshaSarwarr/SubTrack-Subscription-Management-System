import Subscription  from "@/app/types/subscription";

export function calculateMonthlySpending(subscriptions: Subscription[]): number 
{
  
  return subscriptions.reduce((total, sub) => {
    if (sub.status !== "ACTIVE") {
      return total;
    }
    
    const cost = Number(sub.cost);
    switch (sub.billingCycle) {
      case "MONTHLY":
        return total + cost;

      case "YEARLY":
        return total + cost / 12;

      case "WEEKLY":
        return total + (cost * 52) / 12;

      default:
        return total;
    }
  }, 0);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function getRemainingDays(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(0, 0, 0, 0);

  const diffInMs = end.getTime() - today.getTime();

  return {
    days: Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)),
    overdue: diffInMs < 0,
  };
}