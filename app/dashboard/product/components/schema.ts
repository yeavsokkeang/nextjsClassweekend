import * as z from "zod"

const productSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  description: z.string().optional(),
  color: z.string().optional(),
  price: z.number().optional(),
  qty: z.number().optional(),
})
