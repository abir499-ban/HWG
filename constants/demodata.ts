import { LoanApplicationType, LoanRequestFormType, LoanViewForLenderType } from "@/utils/LoanRequest.schema";
import { LenderViewType } from '@/utils/LenderView.schema'

export const farmer = {
  name: "Murali Ganesh",
  transactions: 87,
  loans: 3,
  loansRepaid: 2,
  productivityRecords: [
    { month: "Jan", productivity: 870, yield: 430 },
    { month: "Feb", productivity: 910, yield: 520 },
    { month: "Mar", productivity: 930, yield: 610 },
    { month: "Apr", productivity: 860, yield: 485 },
    { month: "May", productivity: 950, yield: 670 },
    { month: "Jun", productivity: 1000, yield: 710 },
    { month: "Jul", productivity: 800, yield: 400 },
    { month: "Aug", productivity: 600, yield: 650 },
    { month: "Sep", productivity: 850, yield: 850 },
    { month: "Oct", productivity: 200, yield: 400 },
    { month: "Nov", productivity: 700, yield: 550 },
    { month: "Dec", productivity: 551, yield: 600 },
  ],
  creditUtilization: 73,
  repaymentReliability: 92,
  landProductivity: 82,
};

export const lender = {
  name: 'Avinash Sharma',
  totalCapital: 2800000000, // 28,000,000.00 naira (in kobo)
  avgLoanSize: 15000000, // 150,000.00 naira (in kobo)
  interestRate: 20.5, // percent
  repaymentTermMonths: 12,
  acceptedCollateralTypes: ["land", "equipment", "vehicle"],
  customerBaseSize: 410,
  applicationsApproved: 352,
  applicationsTotal: 432,
  loansDefaulted: 19,
  loansIssued: 377,
  interestFees: 31200000, // in kobo
  portfolioValue: 245000000, // in kobo
  operatingExpenses: 1550000, // in kobo
  totalIncome: 23400000, // in kobo
}
export const loanApprovalRate = (lender.applicationsApproved / lender.applicationsTotal) * 100;
export const loanDefaultRate = (lender.loansDefaulted / lender.loansIssued) * 100;
export const portfolioYield = (lender.interestFees / lender.portfolioValue) * 100;
export const operationalEfficiency = (lender.operatingExpenses / lender.totalIncome) * 100;



export const demoloanApplications: LoanApplicationType[] = [
  {
    id: "FA001",
    lenderName: "AgriBank Financial",
    lenderLogo: "/placeholder.svg?height=40&width=40",
    loanAmount: 75000,
    purpose: "Equipment Purchase",
    status: "Approved",
    dateApplied: "2024-01-10",
    lastUpdated: "2024-01-20",
    requestedInterestRate: 4.5,
    term: 60,
    progress: 100,
    documents: ["Application", "Financial Statements", "Equipment Quote"],
    timeline: [
      { date: "2024-01-10", event: "Application Submitted", status: "completed" },
      { date: "2024-01-12", event: "Initial Review", status: "completed" },
      { date: "2024-01-15", event: "Credit Check", status: "completed" },
      { date: "2024-01-18", event: "Farm Inspection", status: "completed" },
      { date: "2024-01-20", event: "Loan Approved", status: "completed" },
    ],
  },
  {
    id: "FA002",
    lenderName: "Rural Development Bank",
    lenderLogo: "/placeholder.svg?height=40&width=40",
    loanAmount: 50000,
    purpose: "Crop Financing",
    status: "Under Review",
    dateApplied: "2024-01-15",
    lastUpdated: "2024-01-22",
    requestedInterestRate: 3.8,
    term: 12,
    progress: 60,
    documents: ["Application", "Financial Statements", "Crop Plan"],
    timeline: [
      { date: "2024-01-15", event: "Application Submitted", status: "completed" },
      { date: "2024-01-17", event: "Initial Review", status: "completed" },
      { date: "2024-01-20", event: "Credit Check", status: "completed" },
      { date: "2024-01-22", event: "Additional Documents Requested", status: "current" },
    ],
  },
  {
    id: "FA003",
    lenderName: "Farm Credit Union",
    lenderLogo: "/placeholder.svg?height=40&width=40",
    loanAmount: 120000,
    purpose: "Land Purchase",
    status: "Pending",
    dateApplied: "2024-01-18",
    lastUpdated: "2024-01-18",
    requestedInterestRate: 5.2,
    term: 240,
    progress: 20,
    documents: ["Application", "Property Appraisal"],
    timeline: [
      { date: "2024-01-18", event: "Application Submitted", status: "completed" },
      { date: "2024-01-19", event: "Initial Review", status: "current" },
    ],
  },
  {
    id: "FA004",
    lenderName: "Community Agricultural Lender",
    lenderLogo: "/placeholder.svg?height=40&width=40",
    loanAmount: 25000,
    purpose: "Livestock Purchase",
    status: "Rejected",
    dateApplied: "2024-01-05",
    lastUpdated: "2024-01-12",
    requestedInterestRate: null,
    term: 36,
    progress: 40,
    documents: ["Application", "Financial Statements"],
    timeline: [
      { date: "2024-01-05", event: "Application Submitted", status: "completed" },
      { date: "2024-01-08", event: "Initial Review", status: "completed" },
      { date: "2024-01-12", event: "Application Declined", status: "completed" },
    ],
  },
  {
    id: "FA005",
    lenderName: "State Farm Development Fund",
    lenderLogo: "/placeholder.svg?height=40&width=40",
    loanAmount: 85000,
    purpose: "Infrastructure Development",
    status: "Document Required",
    dateApplied: "2024-01-20",
    lastUpdated: "2024-01-23",
    requestedInterestRate: 4.2,
    term: 84,
    progress: 45,
    documents: ["Application", "Project Plan", "Financial Statements"],
    timeline: [
      { date: "2024-01-20", event: "Application Submitted", status: "completed" },
      { date: "2024-01-22", event: "Initial Review", status: "completed" },
      { date: "2024-01-23", event: "Additional Documents Requested", status: "current" },
    ],
  },
]




export const demolenders: LenderViewType[] = [
  {
    id: '15132',
    name: "AgriBank",
    aadharCard: '5153151215',
    lenderLogo: "https://example.com/logos/agribank.png",
    totalCapital: 5000000,
    applicationsApproved: 85,
  },
  {
    id: '1513',
    name: "GreenFinance Co.",
    aadharCard: '5153151215',
    lenderLogo: "https://example.com/logos/greenfinance.png",
    totalCapital: 3200000,
    applicationsApproved: 80,
  },
  {
    id: '151',
    name: "Rural Credit Union",
    aadharCard: '5153151215',
    lenderLogo: "https://example.com/logos/ruralcu.png",
    totalCapital: 2700000,
    applicationsApproved: 74,
  },
  {
    id: '15132256',
    name: "Harvest Loans",
    aadharCard: '5153151215',
    lenderLogo: "https://example.com/logos/harvestloans.png",
    totalCapital: 4100000,
    applicationsApproved: 97,
  },
  {
    id: '15132654',
    name: "AgroCapital Trust",
    aadharCard: '5153151215',
    lenderLogo: "https://example.com/logos/agrotrust.png",
    totalCapital: 6000000,
    applicationsApproved: 63,
  },
];



export const demoloanRequests : LoanViewForLenderType[]= [
  {
    id: "LR001",
    farmerName: "John Smith",
    loanAmount: 50000,
    loanPurpose: "Home Renovation",
    loanTermMonth: 6,
    status: "Pending",
    dateApplied: "2024-01-15",
  },
  {
    id: "LR002",
    farmerName: "Sarah Johnson",
    loanAmount: 25000,
    loanPurpose: "Debt Consolidation",
    loanTermMonth: 8,
    status: "Approved",
    dateApplied: "2024-01-14",
  },
  {
    id: "LR003",
    farmerName: "Michael Brown",
    loanAmount: 75000,
    loanPurpose: "Business Expansion",
    loanTermMonth: 15,
    status: "Under Review",
    dateApplied: "2024-01-13",
  },
  {
    id: "LR004",
    farmerName: "Emily Davis",
    loanAmount: 15000,
    loanPurpose: "Medical Expenses",
    loanTermMonth: 6,
    status: "Rejected",
    dateApplied: "2024-01-12",
  },
  {
    id: "LR005",
    farmerName: "David Wilson",
    loanAmount: 100000,
    loanPurpose: "Home Purchase",
    loanTermMonth: 10,
    status: "Pending",
    dateApplied: "2024-01-11",
   
  },
  {
    id: "LR006",
    farmerName: "Lisa Anderson",
    loanAmount: 30000,
    loanPurpose: "Education",
    loanTermMonth: 8,
    status: "Approved",
    dateApplied: "2024-01-10",
  },
]
