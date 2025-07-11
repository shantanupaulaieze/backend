import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6,'Password must be at least 6 characters ')
})
export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty()
})