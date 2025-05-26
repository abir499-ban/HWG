import { Progress } from "@/components/ui/progress";
import { CheckCircle, BarChart3, TrendingUp } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

type Props = {
    creditUtilization: number;
    repaymentReliability: number;
    landProductivity: number;
};

const metrics: {
    key: keyof Props;
    label: string;
    Icon: React.ElementType;
    color: string;
    textColor: string;
    help: string;
    info : string;
}[] = [
        {
            key: "creditUtilization",
            label: "Credit Utilization Ratio",
            Icon: TrendingUp,
            color: "from-green-400 via-green-200 to-green-50",
            textColor: "text-green-700",
            help: "Optimal is below 70%.",
            info : "Credit utilization measures the percentage of total available credit a farmer is currently using, helping lenders assess how well the farmer manages existing credit and whether they may be over-leveraged"
        },
        {
            key: "repaymentReliability",
            label: "Repayment Reliability Score",
            Icon: CheckCircle,
            color: "from-yellow-200 via-green-50 to-green-100",
            textColor: "text-yellow-700",
            help: "Higher is better.",
            info : "Repayment reliability indicates how consistently a farmer repays loans or debts on time, reflecting their trustworthiness and reducing perceived lending risk"
        },
        {
            key: "landProductivity",
            label: "Land Productivity Ratio",
            Icon: BarChart3,
            color: "from-blue-100 via-green-50 to-green-100",
            textColor: "text-blue-600",
            help: "Reflects average land output.",
            info : "Land productivity represents the farm’s capacity to generate output (such as crop yield) per unit area, serving as a key indicator of agricultural efficiency and the farmer’s management skills"
        },
    ];
const DashboardMetrics = (props: Props) => (
    <>
        {metrics.map((metric) => (
            <HoverCard key={metric.key}>
                <HoverCardTrigger asChild>
                    <div
                        className={`rounded-xl bg-gradient-to-br ${metric.color} shadow-md px-6 py-5 flex flex-col items-start relative animate-scale-in group overflow-hidden`}
                    >
                        <div className="flex items-center mb-2">
                            <metric.Icon className={`h-6 w-6 mr-3 ${metric.textColor} opacity-80`} />
                            <h3 className={`font-semibold ${metric.textColor}`}>{metric.label}</h3>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl font-bold">{props[metric.key]}%</span>
                            <span className="ml-1 text-xs font-medium text-gray-500">{metric.help}</span>
                        </div>
                        {props ? (
                            <Progress value={props[metric.key]} className="h-2 bg-white/60" />
                        ) : (
                            <span> NO DATA</span>
                        )}

                    </div>
                </HoverCardTrigger>
                <HoverCardContent className={`w-80 bg-gradient-to-br ${metric.color}`}>
                    <div className="flex justify-between space-x-4 rounded-b-md">
                        <div className="space-y-1">
                            <p className="text-sm font-normal text-black">
                                {metric.info}
                            </p>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>

        ))}
    </>
);

export default DashboardMetrics;
