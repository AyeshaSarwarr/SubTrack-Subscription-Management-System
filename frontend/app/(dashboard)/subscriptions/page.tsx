"use client";
import {useRouter} from "next/navigation";
import { Pencil, Trash2, Search, Plus} from "lucide-react";
import {useEffect, useState, useMemo} from "react";
import getSubscriptions from "@/app/services/subscriptionService";
import { deleteSubscription as deleteSubscriptionService} from "@/app/services/subscriptionService";
import Subscription  from "@/app/types/subscription";
import Summary from "@/app/(dashboard)/components/Summary";
import { calculateMonthlySpending, formatDate} from "@/app/utils/subscriptionUtils";
import { DeleteModal } from "@/app/(dashboard)/components/DeleteModal";

export default function Subscriptions() {
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const monthlySpending = useMemo(() => 
      calculateMonthlySpending(subscriptions),
    [subscriptions]
  );

  useEffect(() => {
    async function fetchSubscriptions() {
    try {
        const data = await getSubscriptions();

        setSubscriptions(data);
    } catch (error) {
        if ( error instanceof Error && error.message === "Unauthorized") {
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
  
  const handleDeleteClick = (sub: Subscription) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSub) return;

    setIsDeleting(true);
    try {
      await deleteSubscriptionService(selectedSub.id);

      // Remove from UI state on success
      setSubscriptions((prev) => prev.filter((item) => item.id !== selectedSub.id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    } finally {
      setIsDeleting(false);
      setSelectedSub(null);
    }
  };

  const updateSubscription = (id: number) => {
    router.push(`/update-subscription/${id}`)
  }
  
  const filteredSubscriptions = useMemo(() => {

      const query = search.trim().toLowerCase();

      if (!query) return subscriptions;

    return subscriptions.filter(sub =>
      sub.name.toLowerCase().includes(query) ||
      sub.category.toLowerCase().includes(query) ||
      (sub.plan ?? "").toLowerCase().includes(query) ||
      sub.billingCycle.toLowerCase().includes(query) ||
      sub.status.toLowerCase().includes(query)
    );
  }, [subscriptions, search]);


  const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

  if (loading) {
    return (
        <div className="flex min-h-75 items-center justify-center">
            <p className="text-slate-500">
                Loading subscriptions...
            </p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center py-10 text-center text-red-500">
            {error}
        </div>
    );
}

  return (
    <div className="space-y-8 sm:space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl md:text-4xl sm:text-4xl font-bold text-slate-800 dark:text-white">
            Subscriptions
          </h1>

          <p className="mt-2 md:text-xl text-xs text-slate-500 dark:text-white">
            Manage all your subscriptions in one place.
          </p>
        </div>

        <button 
          className="flex md:w-70 w-40 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 transition md:text-xl text-xs"
          onClick={() => router.push("/add-subscription")}
        >
          <Plus size={20} />
          Add Subscription
        </button>

      </div>

      <Summary monthlySpending={monthlySpending} />

      {/* Search */}
      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          value={search}
          placeholder="Search subscriptions..."
          className="md:w-full w-70 rounded-xl border bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-100"
          onChange={(e) => {setSearch(e.target.value)}}
        />

      </div>

      {error && (
        <p className="text-red-500 dark:bg-slate-900">
            {error}
        </p>
      )}

      {!error && (
        <>
        <div className="space-y-4">
  {/* MOBILE CARDS (Hidden on md+) */}
  <div className="grid gap-4 md:hidden">
    {filteredSubscriptions.map((sub) => (
      <div key={sub.id} className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-100 dark:text-black">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-semibold text-slate-900">{sub.name}</h3>
            <span className="text-xs text-slate-500">{sub.plan ?? "N/A"} • {sub.category}</span>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              sub.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {sub.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-3 text-xs">
          <div>
            <p className="text-slate-500">Cost</p>
            <p className="font-medium">{currencyFormatter.format(sub.cost)} / {sub.billingCycle}</p>
          </div>
          <div>
            <p className="text-slate-500">Start Date</p>
            <p className="font-medium">{formatDate(sub.startDate)}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            className="flex items-center gap-1 rounded-lg bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700"
            onClick={() => updateSubscription(sub.id)}
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
            onClick={() => handleDeleteClick(sub)}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
        {/* Modern Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => !isDeleting && setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedSub?.name}
        isLoading={isDeleting}
      />
      </div>
    ))}
  </div>

  {/* DESKTOP TABLE (Hidden on mobile) */}
  <div className="hidden md:block overflow-x-auto rounded-2xl border bg-white shadow dark:bg-slate-100">
    <table className="w-full text-sm dark:text-black">
      
            <thead className="bg-slate-100 ">

              <tr className="text-left text-slate-600 dark:text-black">

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap">Name</th>

                <th className="hidden md:table-cellpx-3 sm:px-6 py-4 whitespace-nowrap">Plan</th>

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap">Cost</th>

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap">Billing</th>

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap">Start Date</th>

                <th className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">End Date</th>

                <th className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">Category</th>

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap">Status</th>

                <th className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
        {(subscriptions.length==0 || filteredSubscriptions.length === 0) && !loading && !error && (
          <tr>
            <td colSpan={9} className="text-center py-6">
                No subscriptions found.
            </td>
          </tr>
        )}

        {filteredSubscriptions.map((sub) => (

                <tr
                  key={sub.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-3 sm:px-6 py-5 whitespace-nowrap font-semibold">
                    {sub.name}
                  </td>

                  <td className="hidden md:table-cell px-3 sm:px-6 py-5 whitespace-nowrap">
                    {sub.plan ?? "N/A"}
                  </td>

                  <td className="px-3 sm:px-6 py-5 whitespace-nowrap font-medium">
                    {currencyFormatter.format(sub.cost)}
                  </td>

                  <td className="px-3 sm:px-6 py-5 whitespace-nowrap">
                    {sub.billingCycle}
                  </td>

                  <td className="px-3 sm:px-6 py-5 whitespace-nowrap">
                    {formatDate(sub.startDate)}
                  </td>

                  <td className="hidden md:table-cell px-3 sm:px-6 py-5 whitespace-nowrap">
                    {formatDate(sub.endDate)}
                  </td>

                  <td className="hidden md:table-cell px-3 sm:px-6 py-5 whitespace-nowrap">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {sub.category}
                    </span>

                  </td>

                  <td className="px-3 sm:px-6 py-5 whitespace-nowrap">

                    <span
                      className={`inline-flex whitespace-nowrap rounded-full bg-blue-100 px-2 sm:px-3 py-1 text-xs sm:text-sm ${
                        sub.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sub.status}
                    </span>

                  </td>

                  <td className="w-24 px-3 sm:px-6 py-5 whitespace-nowrap">

                    <div className="flex justify-center gap-2">

                      <button className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200 transition"
                      onClick={()=> {updateSubscription(sub.id)}}
                      >
                        <Pencil size={18} />
                      </button>

                      <button className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition"
                      onClick={() => handleDeleteClick(sub)}>
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>
          </table>
              {/* Modern Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => !isDeleting && setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedSub?.name}
          isLoading={isDeleting}
        />
        </div>

    </div>


        <p className="text-sm text-slate-500 ">
        {subscriptions.length} subscriptions
        </p>
                {search && (
  <p className="mt-2 text-slate-500">
    Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
  </p>
)}
      </>
    )}

      
      </div>
    );
}