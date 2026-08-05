"use client"
import SubscriptionForm from "@/app/(dashboard)/components/SubscriptionForm";
import Subscription from "@/app/types/subscription"
import { getSubscriptionById } from "@/app/services/subscriptionService"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function UpdateSubscription() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = Number(params.id);

    useEffect(()=>{
        async function fetchSubscription(){
        try {
        const data = await getSubscriptionById(id);

        setSubscription(data);
    } catch (error) {
        setError(
            error instanceof Error
                ? error.message
                : "Something went wrong."
        );
    } finally {
        setLoading(false);
    }
        }
        fetchSubscription();
    },[id])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center dark:text-white dark:bg-slate-900">
                <p className="text-slate-500 dark:text-white">
                    Loading subscription...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-600 dark:text-white dark:bg-slate-900"> {error}</div>
        )
    }

    if (Number.isNaN(id)) {
        return <p>Invalid subscription id.</p>;
    }
  return (
    <>
        <h1 className="text-3xl font-bold dark:text-white my-5">
        Update Subscription
        </h1>

        <p className="text-slate-500 dark:text-white my-5">
            Edit the subscription information.
        </p>

    
    <SubscriptionForm mode="update"
    initialData={subscription}/>

        
        
    </>
  )
}