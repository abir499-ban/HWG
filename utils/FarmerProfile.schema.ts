type ProductivityRecord = {
    month: string,
    productivity: number,
    yield: number
}
export type FarmerProfileSchema = {
    name: string,
    transactions: number,
    loans: number,
    loansRepaid: number,
    productivityRecords: ProductivityRecord[],
    creditUtilization: number,
    repaymentReliability: number,
    landProductivity: number,

}

export const defaultFarmerProfile: FarmerProfileSchema = {
  name: "",
  transactions: 0,
  loans: 0,
  loansRepaid: 0,
  productivityRecords: [],
  creditUtilization: 0,
  repaymentReliability: 0,
  landProductivity: 0,
};