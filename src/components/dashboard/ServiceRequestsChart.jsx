import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", cleaning: 12, electrical: 8, water: 5, furniture: 3 },
  { month: "Aug", cleaning: 15, electrical: 10, water: 7, furniture: 4 },
  { month: "Sep", cleaning: 18, electrical: 6, water: 4, furniture: 6 },
  { month: "Oct", cleaning: 14, electrical: 12, water: 8, furniture: 2 },
  { month: "Nov", cleaning: 20, electrical: 9, water: 6, furniture: 5 },
  { month: "Dec", cleaning: 16, electrical: 11, water: 3, furniture: 4 },
];

export function ServiceRequestsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-card-foreground">Service Requests by Type</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="cleaning" name="Cleaning" fill="hsl(217, 91%, 45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="electrical" name="Electrical" fill="hsl(35, 92%, 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="water" name="Water" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="furniture" name="Furniture" fill="hsl(280, 65%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}