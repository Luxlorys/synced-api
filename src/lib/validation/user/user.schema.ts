import { z } from "zod";

export const RoleEnum = z.enum(["Admin", "Participant"]);

export const userSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
    email: z.string().email(),
    fullName: z.string().min(1),
    role: RoleEnum,
});

export type UserType = z.infer<typeof userSchema>;

export const getUserResponseSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
    email: z.string().email(),
    fullName: z.string().min(1),
    role: RoleEnum,
    companyId: z.number().int(),
    company: z
        .object({
            name: z.string(),
            size: z.number().int(),
        })
        .optional(),
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
