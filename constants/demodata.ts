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