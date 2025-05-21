import { z } from 'zod'

export const FarmerFormSchema = z.object({
    name: z.string().min(2, "name is not valid").max(50, "name is not valid"),
    digitalId: z.string().min(5, "Digital Farmer ID is required"),
    aadharCard: z.string(),
    dob: z.date({ required_error: "Date of Birth is required" }),
    bankAccount: z.string().min(6, "Bank Account detail is required"),
    password: z.string().min(6, "Password should be at least 6 characters")
})

export type FarmerFormType = z.infer<typeof FarmerFormSchema>