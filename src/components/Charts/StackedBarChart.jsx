import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", sales: 400, customers: 240 },
  { name: "Feb", sales: 300, customers: 138 },
  { name: "Mar", sales: 600, customers: 320 },
  { name: "Apr", sales: 800, customers: 480 },
  { name: "May", sales: 500, customers: 250 },
  { name: "Jun", sales: 900, customers: 600 },
  { name: "Jul", sales: 1000, customers: 700 },
]

function StackedBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent-foreground))" stopOpacity={0.8} />
            <stop offset="100%" stopColor="hsl(var(--accent-foreground))" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value) => [`₹${value}`, ""]}
        />
        <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />
        <Bar
          name="Revenue"
          dataKey="sales"
          fill="url(#colorSales)"
          radius={[4, 4, 0, 0]}
          barSize={30}
          animationDuration={1500}
        />
        <Bar
          name="Customers"
          dataKey="customers"
          fill="url(#colorCustomers)"
          radius={[4, 4, 0, 0]}
          barSize={30}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { StackedBarChart }

