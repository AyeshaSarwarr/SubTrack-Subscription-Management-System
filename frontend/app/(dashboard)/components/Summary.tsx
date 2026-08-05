
function Summary({ monthlySpending }: { monthlySpending: number }) {

    const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    });

  return (
    <div className="rounded-2xl bg-white shadow md:p-6 p-5 border dark:bg-slate-200 w-50 md:w-full">

        <h2 className="md:text-lg text-sm font-semibold text-slate-700">
          Monthly Spending
        </h2>

        <p className="mt-3 md:text-4xl text-sm font-bold text-indigo-600">
          {currencyFormatter.format(monthlySpending)}
        </p>

        
      </div>
  )
}

export default Summary