"use client"
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, TrendingUp, Ratio } from "lucide-react";

type MetricProps = {
  loanApprovalRate: number;
  loanDefaultRate: number;
  portfolioYield: number;
  operationalEfficiency: number;
};


const metricDefs: {
  key : keyof MetricProps;
  label : string;
  icon : React.ElementType;
  color : string;
  help : string
}[] = [
  {
    key: "loanApprovalRate",
    label: "Loan Approval Rate",
    icon: ThumbsUp,
    color: "bg-green-100 text-green-800",
    help: "Approved / Total Applications",
  },
  {
    key: "loanDefaultRate",
    label: "Loan Default Rate",
    icon: ThumbsDown,
    color: "bg-red-100 text-red-700",
    help: "Defaulted / Loans Issued",
  },
  {
    key: "portfolioYield",
    label: "Portfolio Yield",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-700",
    help: "Interest & fees / Portfolio value",
  },
  {
    key: "operationalEfficiency",
    label: "Operational Efficiency",
    icon: Ratio,
    color: "bg-yellow-100 text-yellow-800",
    help: "Expenses / Total income",
  },
];

export function LenderMetrics(props: MetricProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-1 mb-8">
      {metricDefs.map((metric, i) => (
        <div key={metric.key} className={`rounded-xl px-5 py-5 ${metric.color} shadow-md flex flex-col items-start animate-scale-in`} >
          <div className="flex items-center mb-2">
            <metric.icon className="h-6 w-6 mr-2 opacity-80" />
            <div className="font-semibold">{metric.label}</div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold">{props[metric.key as keyof MetricProps].toFixed(1)}%</span>
            <span className="ml-1 text-xs text-gray-500">{metric.help}</span>
          </div>
          <Progress value={props[metric.key as keyof MetricProps]} className="h-2 bg-white/70" />
        </div>
      ))}
    </div>
  );
}


export function LenderRatesPieChart({
  loansIssued,
  loansDefaulted,
}: {
  loansIssued: number;
  loansDefaulted: number;
}) {
  const data = [
    { name: "Issued", value: loansIssued, color: "#22c55e" },
    { name: "Defaulted", value: loansDefaulted, color: "#f59e42" },
    { name: "Repayed", value: Math.max(0, loansIssued - loansDefaulted) , color : "#3361c4"}
  ]
  return (
    
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={200}
            innerRadius={125}
            label={({ name, percent }) => percent > 0 ? `${name} (${(percent*100).toFixed(0)}%)` : ""}
          >
            {data.map((entry, ix) => (
              <Cell key={ix} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 8px #0001" }} />
        </PieChart>
      </ResponsiveContainer>
  );
}
