"use client"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ComposedChart } from "recharts";

type Record = {
  month: string;
  productivity: number;
  yield: number;
};


const ProductivityChart = ({ data }: {data : Record[]}) => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 16 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="month" className="text-sm" />
      <YAxis className="text-sm" />
      <Tooltip contentStyle={{ background: "#f9fafb", borderRadius: 8, border: "none", boxShadow: "0 1px 10px #0001" }} />
      <Legend />
      <Bar dataKey="productivity" fill="#22c55e" radius={[4, 4, 0, 0]} name="Productivity" barSize={22} />
      <Line type="monotone" dataKey="yield" stroke="#2563eb" strokeWidth={3} name="Yield" dot={{ r: 4 }} />
    </ComposedChart>
  </ResponsiveContainer>
);

export default ProductivityChart;