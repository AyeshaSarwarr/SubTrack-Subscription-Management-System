
interface DashboardCardProps {
  title: string;
  value: string;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  color,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-5 lg:p-6 shadow dark:bg-slate-300">
      <p className="md:text-sm text-xs sm:text-base text-slate-500 dark:text-black">
        {title}
      </p>

      <h2
        className={`mt-2 md:text-2xl sm:text-sm font-bold wrap-break-word ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}