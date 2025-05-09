import { z } from "zod";

export const baseIdParamSchema = z.object({
    id: z.string().transform((val) => Number(val)),
});

export type BaseIdParam = z.infer<typeof baseIdParamSchema>;