"use client"
import { useState, useEffect, useMemo } from "react";
import Subscription from "@/app/types/subscription";
import getSubscriptions from "@/app/services/subscriptionService"
import DashboardCard from "../components/DashboardCard";
import { calculateMonthlySpending, formatDate, getRemainingDays} from "@/app/utils/subscriptionUtils";
import CategoryChart from "../components/CategoryChart";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const totalSubscriptions = subscriptions.length;
  const router = useRouter();

    useEffect(() => {
    async function fetchSubscriptions() {
    try {
        const data = await getSubscriptions();
      
        setSubscriptions(data);
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
          router.replace("/login");
          return;
        }

        setError(
            error instanceof Error
                ? error.message
                : "Something went wrong."
        );
    } finally {
        setLoading(false);
    }
}
    
    fetchSubscriptions();
  }, []);


  const renewingSoon = useMemo(() => {
    const today = new Date();
today.setHours(0, 0, 0, 0);

const sevenDaysLater = new Date(today);
sevenDaysLater.setDate(today.getDate() + 7);

return subscriptions.filter((sub) => {
    const end = new Date(sub.endDate);
    end.setHours(0, 0, 0, 0);

    return (
        sub.status === "ACTIVE" &&
        end <= sevenDaysLater
    );
    });
}, [subscriptions]);


  const activeSubscriptions = useMemo(() => {
    return subscriptions.filter(
        sub => sub.status === "ACTIVE"
    ).length;
}, [subscriptions]);

  const monthlySpending = useMemo(() => 
    calculateMonthlySpending(subscriptions),
  [subscriptions]
);

  const COLORS = [
      "#6366F1",
      "#22C55E",
      "#F97316",
      "#06B6D4",
      "#A855F7",
      "#F43F5E",
  ];

  const data = useMemo(() => {
    const counts: Record<string, number> = {};

    subscriptions.forEach(sub => {
        counts[sub.category] = (counts[sub.category] || 0) + 1;
    });

    return Object.entries(counts).map(([category, value], index) => ({
        category,
        value,
        fill: COLORS[index % COLORS.length],
    }));
}, [subscriptions]);

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-white">
                Loading subscriptions...
            </p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
          <p className="text-center text-red-500">
              {error}
          </p>
      </div>
    );
}

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-black">

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-white">
              Track your subscriptions and spending.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">

            <DashboardCard
            title="Monthly Spending"
            value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            }).format(monthlySpending)} 
            color="text-indigo-600" />

            <DashboardCard
                title="Active Subscriptions"
                value={activeSubscriptions.toString()}
                color="text-green-600" />

              <DashboardCard
                title="Renewing Soon"
                value={renewingSoon.length.toString()}
                color="text-orange-500" />

              <DashboardCard
                title="Total Subscriptions"
                value={totalSubscriptions.toString()}
                color="text-slate-700"/>

          </div>


          <CategoryChart data={data} />

          {/* Renewals & Overdue */}
          <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow dark:bg-slate-200">

            <h2 className="text-xl font-bold">
              Renewals & Overdue
            </h2>

            <div className="mt-6 space-y-4 ">

              {/* Card */}

              {renewingSoon.length === 0 ? (
                <p className="text-slate-500 dark:text-white">
                    No subscriptions renewing soon.
                </p>
                ) : ( renewingSoon.map((sub)=>{
                  const remained = getRemainingDays(sub.endDate);

                return (
                <div
                    key={sub.id}
                    className="flex md:items-center justify-between rounded-xl border p-4 dark:bg-slate-200 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-semibold">{sub.name}</p>
                        <p className="text-sm  text-slate-500 dark:text-black">
                            {sub.plan}
                        </p>
                    </div>

            <div className="text-right sm:text-right">
                <p className="font-semibold">
                    {formatDate(sub.endDate)}
                </p>

                <p className="mt-1 md:text-sm text-xs text-orange-500 wrap-break-word">
                    {remained.days}
                    {remained.overdue
                        ? " days have passed -  Renewal overdue"
                        : " days left"}
                </p>
            </div>
        </div>
        )}
          )  
            )}
            </div>
          </div>
        </div>
      </main>
    </div>
    
  );
}