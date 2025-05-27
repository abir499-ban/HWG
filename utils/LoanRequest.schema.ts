import {z} from 'zod'


export const LoanformSchema = z.object({
  loanAmount: z
    .number({ required_error: "Loan amount is required" })
    .nonnegative("Amount must be positive")
    .min(5000 , "Minimum Loan amount is 5000"),
  loanPurpose: z
    .string({ required_error: "Enter the purpose of the loan" })
    .min(2, "Enter a short loan purpose"),
  loanTermMonths: z
    .number({ required_error: "Term is required" })
    .int("Must be a whole number")
    .min(1, "Minimum 1 month"),
  requestedInterestRate: z
    .union([z.number({ invalid_type_error: "Enter a valid rate" }).min(0).max(100), z.undefined()])
    .optional(),
});

export type LoanRequestFormType = z.infer<typeof LoanformSchema>;