"use client"

import SubscriptionForm from "@/app/(dashboard)/components/SubscriptionForm"
import { useRouter } from "next/navigation"

export default function AddSubscription() {
  const router = useRouter()
  return (
    <>

      <div className="mb-8 ">
        <button
            onClick={() => router.back()}
            className="mb-4 text-sm text-indigo-600 hover:underline"
        >
            ← Back
        </button>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Add Subscription
        </h1>

        <p className="mt-2 text-slate-500 dark:text-white">
            Fill in the details below.
        </p>
    </div>

    <SubscriptionForm mode="create" initialData={null}/>
    
    
  </>
  )
}

