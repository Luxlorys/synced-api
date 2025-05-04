import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

const OTP_CODE_LENGTH = 4;

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH),
    code: z.string().min(OTP_CODE_LENGTH).max(OTP_CODE_LENGTH).optional(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;

const RoleEnum = z.enum(["Admin", "Participant"]);

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
    role: RoleEnum,
});

export type UserType = z.infer<typeof userSchema>;

export const loginSchema = z.object({
    authentication: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    user: userSchema,
});

export const updatePasswordSchema = z.object({
    id: z.number(),
    oldPassword: z.string().min(MIN_PASSWORD_LENGTH),
    newPassword: z.string().min(MIN_PASSWORD_LENGTH),
});

export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;
