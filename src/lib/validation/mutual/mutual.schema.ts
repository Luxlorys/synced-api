import { z } from "zod";

export const basePaginationScema = z.object({
    skip: z
        .string()
        .transform((val) => Number(val))
        .optional(),
    take: z
        .string()
        .transform((val) => Number(val))
        .optional(),
});

export type BasePagination = z.infer<typeof basePaginationScema>;