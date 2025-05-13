import { z } from "zod";
import { getTaskResponseSchema } from "../task/task.schema.js";

export const RoleEnum = z.enum(["Admin", "Participant"]);

export const getUserResponseSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
    email: z.string().email(),
    fullName: z.string().min(1),
    role: RoleEnum,
    company: z
        .object({
            name: z.string(),
            size: z.number().int(),
            identifier: z.string(),
        })
        .nullable(),
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export const userShortSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    role: RoleEnum,
});

export const updateUserBodySchema = z.object({
    email: z.string().email().optional(),
    fullName: z.string().optional(),
});

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export const getUsersTasksResponseSchema = z.object({
    tasks: z.array(getTaskResponseSchema),
});

export type GetUsersTasksResponse = z.infer<typeof getUsersTasksResponseSchema>;