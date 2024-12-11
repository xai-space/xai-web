import { z } from 'zod'

export const marketingSchema = z.object({
  marketing: z
    .array(z.object({ type: z.number(), percent: z.number() }))
    .optional(),
})
