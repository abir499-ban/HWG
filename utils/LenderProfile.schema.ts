export type lenderProfileType =  {
    name: string;
    totalCapital: number; 
    avgLoanSize: number; 
    interestRate: number; 
    repaymentTermMonths: number;
    acceptedCollateralTypes: string[];
    customerBaseSize: number;
    applicationsApproved: number;
    applicationsTotal: number;
    loansDefaulted: number;
    loansIssued: number;
    interestFees: number; 
    portfolioValue: number; 
    operatingExpenses: number; 
    totalIncome: number; 
    loanApprovalRate : number;
    loanDefaultRate : number;
    portfolioYield : number;
    operationalEfficiency : number
}

export const defaultLenderProfile: lenderProfileType = {
  name: '',
  totalCapital: 0,
  avgLoanSize: 0,
  interestRate: 0,
  repaymentTermMonths: 0,
  acceptedCollateralTypes: [],
  customerBaseSize: 0,
  applicationsApproved: 0,
  applicationsTotal: 0,
  loansDefaulted: 0,
  loansIssued: 0,
  interestFees: 0,
  portfolioValue: 0,
  operatingExpenses: 0,
  totalIncome: 0,
  loanApprovalRate: 0,
  loanDefaultRate: 0,
  portfolioYield: 0,
  operationalEfficiency: 0
};
