import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

interface CategoryData {
  category: string;
  value: number;
  fill: string
}

interface CategoryChartProps {
  data: CategoryData[];
}

export default function CategoryChart({
  data,
}: CategoryChartProps) {

  
  return (

    <div className="h-72 sm:h-80 lg:h-96">
    <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                innerRadius="45%"
                outerRadius="75%"
            />
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
</div>
  )
}

// <PieChart width={350} height={350}>
