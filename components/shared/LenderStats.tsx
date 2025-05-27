"use client"
import React from 'react'
import { FileText, Users, Shield, IndianRupee } from "lucide-react";
import {collateralTypes} from '@/utils/LenderProfile.schema'

type Props = {
  totalCapital: number;
  avgLoanSize: number;
  interestRate: number;
  repaymentTermMonths: number;
  acceptedCollateral: boolean;
  customerBaseSize: number;
};

const stats: {
    key: keyof Props,
    label: string,
    icon: React.ElementType,
    color: string,
    format: (n: number) => string
}[] = [
  {
    key: "totalCapital",
    label: "Total Capital",
    icon: IndianRupee,
    color: "bg-green-100 text-green-700",
    format: (n: number) => `₹${(n / 100).toLocaleString()}`,
  },
  {
    key: "avgLoanSize",
    label: "Avg. Loan Size",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
    format: (n: number) => `₹${(n / 100).toLocaleString()}`,
  },
  {
    key: "interestRate",
    label: "Interest Rate",
    icon: Shield,
    color: "bg-yellow-100 text-yellow-800",
    format: (n: number) => `${n}%`,
  },
  {
    key: "repaymentTermMonths",
    label: "Repay Term (mo)",
    icon: FileText,
    color: "bg-slate-100 text-slate-700",
    format: (n: number) => `${n} mo`,
  },
  {
    key: "customerBaseSize",
    label: "Customer Base",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
    format: (n: number) => `${n} Customer`,
  },
];

export function LenderStats(props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
      {stats.map((stat)=>(
        <div
          key={stat.key}
          className={`rounded-xl shadow-md flex items-center px-4 py-4 animate-fade-in ${stat.color}`}
        >
          <stat.icon className="h-7 w-7 mr-3 opacity-80" />
          <div>
            <div className="font-semibold text-lg">{stat.format(props[stat.key] as number)}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
      <div className="rounded-xl shadow-md px-4 py-4 flex flex-col justify-center items-start bg-indigo-50 text-indigo-700 min-h-[70px]">
        <div className="text-sm font-semibold mb-1">Collateral Types</div>
        <div className="flex flex-wrap gap-2">
          {props.acceptedCollateral ? (
            collateralTypes.map(type => (
              <span key={type} className="bg-indigo-100 text-indigo-700 rounded px-2 py-0.5 text-xs">{type}</span>
            ))
          ) : (
            <span>Collateral Not Accepted</span>
          )}
          {/* {props.acceptedCollateralTypes.map(type => (
            <span key={type} className="bg-indigo-100 text-indigo-700 rounded px-2 py-0.5 text-xs">{type}</span>
          ))} */}
        </div>
      </div>
    </div>
  );
}
