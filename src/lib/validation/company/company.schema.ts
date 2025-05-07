import { z } from "zod";

const userSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
});

export const getCompanyResponseSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1),
    size: z.number().int().min(1),
    createdAt: z.date(),
    users: z.array(userSchema),
    admin: userSchema,
});

export type GetCompanyResponse = z.infer<typeof getCompanyResponseSchema>;
