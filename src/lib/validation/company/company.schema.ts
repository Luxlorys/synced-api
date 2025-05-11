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

export const updateCompanyBodySchema = z.object({
    name: z.string().optional(),
    size: z.number().int().optional(),
});

export type UpdateCompanyBody = z.infer<typeof updateCompanyBodySchema>;

export const deleteParticipantFromCompanyBodySchema = z.object({
    userId: z.number().int(),
});

const participantShortSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
});

export const getCompanyParticipantsResponseSchema = z.object({
    participants: z.array(participantShortSchema),
});

export type GetCompanyParticipantsResponse = z.infer<typeof getCompanyParticipantsResponseSchema>;
