import { z } from "zod";
import { RoleEnum, userSchema } from "../user/user.schema.js";

const MIN_PASSWORD_LENGTH = 8;

export const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH),
    fullName: z.string().min(1),
    role: RoleEnum,
    company: z
        .object({
            name: z.string().min(1),
            size: z.number().int().min(1),
        })
        .optional(),
    identifier: z.string().min(1).optional(),
});

export const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH),
});

export const loginResponseSchema = z.object({
    authentication: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    user: userSchema,
});

export const updatePasswordBodySchema = z.object({
    oldPassword: z.string().min(MIN_PASSWORD_LENGTH),
    newPassword: z.string().min(MIN_PASSWORD_LENGTH),
});

export type UpdatePasswordBodyType = z.infer<typeof updatePasswordBodySchema>;

export type LoginBodyType = z.infer<typeof loginBodySchema>;

export type CreateUserBodyType = z.infer<typeof createUserBodySchema>;
