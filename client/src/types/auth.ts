import { joinContributorFormSchema } from "@/lib/validator/auth"
import z from "zod"
export type createUserType = z.infer<typeof joinContributorFormSchema>
