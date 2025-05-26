import { Users, FileText, FileChartLine } from "lucide-react";

type Props = {
  transactions: number;
  loans: number;
  loansRepaid: number;
};

const cards = [
  {
    key: "transactions",
    label: "Transactions",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "loans",
    label: "Loans Held",
    icon: FileChartLine,
    color: "bg-green-100 text-green-700",
  },
  {
    key: "loansRepaid",
    label: "Loans Repaid",
    icon: Users,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const DashboardStats = ({
  transactions,
  loans,
  loansRepaid,
}: Props) => {
  const values: Record<string, number> = {
    transactions,
    loans,
    loansRepaid,
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`rounded-xl shadow-md flex items-center px-5 py-4 transition-transform hover:scale-105 animate-fade-in ${card.color}`}
        >
          <card.icon className="h-8 w-8 mr-4 opacity-80" />
          <div>
            <div className="font-semibold text-lg">{values[card.key]}</div>
            <div className="text-sm font-medium">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
