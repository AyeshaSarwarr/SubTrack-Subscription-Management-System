import Subscription from "@/app/types/subscription";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {updateSubscription, createSubscription} from "@/app/services/subscriptionService"
import {BillingCycle, SubscriptionStatus, Category} from "@/app/types/subscription"

interface SubscriptionFormProps {
  mode: "create" | "update";
  initialData: Subscription | null
}

export default function SubscriptionForm({mode, initialData}: SubscriptionFormProps) {

    const [name, setName] = useState(initialData?.name ?? "");
    const [plan, setPlan] = useState(initialData?.plan ?? "");
    const [cost, setCost] = useState(initialData ? initialData.cost.toString() : "");
    const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialData?.billingCycle ?? "MONTHLY");
    const [status, setStatus] = useState<SubscriptionStatus>(initialData?.status ?? "ACTIVE");
    const [category, setCategory] = useState<Category>(initialData?.category ?? "OTHER");
    const [startDate, setStartDate] = useState(initialData?.startDate.slice(0,10) ?? "");
    const [endDate, setEndDate] = useState(initialData?.endDate.slice(0,10) ?? "");
    const [error, setError] = useState("")
    
    const router = useRouter();

    useEffect(() => {

    if (!initialData) return;

    setName(initialData.name);
    setPlan(initialData.plan || "");
    setCost(initialData?.cost.toString())
    setBillingCycle(initialData.billingCycle)
    setStatus(initialData.status)
    setCategory(initialData.category)
    setStartDate(initialData.startDate.slice(0,10))
    setEndDate(initialData.endDate.slice(0,10))
    
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            plan,
            cost: Number(cost),
            billingCycle,
            category,
            status,
            startDate,
            endDate,
        };
    if (mode === "create") {
        try {
            await createSubscription(payload);

            router.push("/subscriptions");
        }   catch (error) {
           
            setError( error instanceof Error ? error.message : "Something went wrong." );
            if ( error instanceof Error && error.message === "Unauthorized") {
            router.replace("/login");
            return;
        }
        console.error(error);
        }
    
    } else {
        try {
            await updateSubscription(initialData!.id,payload );

            router.push("/subscriptions");
        } catch (error) {
            setError( error instanceof Error ? error.message : "Something went wrong." );

            if ( error instanceof Error && error.message === "Unauthorized"){
            router.replace("/login");
            return;
        }
            console.error(error);
        }
    }
}

if (error) {
    return (
        <div className="text-red-500">
            {error}
        </div>
    );
}
  return (
    <div className="rounded-2xl border bg-white p-8 shadow dark:bg-slate-900 dark:text-white">

        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="mb-2 block font-medium">
                    Subscription Name
                </label>

                <input
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Netflix"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Plan
                </label>

                <input
                    className="w-full rounded-xl border px-4 py-3"
                    placeholder="Premium"
                    value={plan||""}
                    onChange={(e)=>setPlan(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Cost
                </label>

                <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-xl border px-4 py-3"
                    placeholder="19.99"
                    value={cost}
                    onChange={(e)=>setCost(e.target.value)}
                />
            </div>

            <label className="mb-2 block font-medium">
            Billing Cycle
            </label>

            <select className="w-full rounded-xl border px-4 py-3 dark:bg-slate-900" value={billingCycle} onChange={(e)=>setBillingCycle(e.target.value as BillingCycle)}>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="WEEKLY">Weekly</option>
            </select>

            <label className="mb-2 block font-medium">
            Category
            </label>

            <select className="w-full rounded-xl border px-4 py-3 dark:bg-slate-900" value={category} onChange={(e)=>setCategory(e.target.value as Category)}>

                <option value="TECH">Tech</option>

                <option value="DESIGN">Design</option>

                <option value="MARKETING">Marketing</option>

                <option value="PRODUCTIVITY">Productivity</option>

                <option value="AI">AI</option>

                <option value="ENTERTAINMENT">Entertainment</option>

                <option value="OTHER">Other</option>

            </select>

            <label className="mb-2 block font-medium">
            Status
            </label>

            <select className="w-full rounded-xl border px-4 py-3 dark:bg-slate-900" value={status} onChange={(e)=>setStatus(e.target.value as SubscriptionStatus)}>

            <option value="ACTIVE">
                Active
            </option>

            <option value="CANCELLED">
                Cancelled
            </option>

        </select>

        <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <label className="mb-2 block font-medium">
                        Start Date
                    </label>

                    <input
                        type="date"
                        className="w-full rounded-xl border px-4 py-3"
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)}
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        End Date
                    </label>

                    <input
                        type="date"
                        className="w-full rounded-xl border px-4 py-3"
                        value={endDate}
                        onChange={(e)=>setEndDate(e.target.value)}
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-xl border px-6 py-3 font-medium hover:bg-slate-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    {mode === "create" ? "Add Subscription" : "Update Subscription"}
                </button>

            </div>

        </form>
    </div>
  )
}
