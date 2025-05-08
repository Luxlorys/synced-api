import { FastifyReply, FastifyRequest } from "fastify";
import { UserType } from "@/lib/validation/user/user.schema.js";
import {
    CreateUserBodyType,
    LoginBodyType,
    UpdatePasswordBodyType,
} from "@/lib/validation/auth/auth.schema.js";

export type CreateAdminUserPayload = {
    email: string;
    fullName: string;
    password: string;
    company: {
        name: string;
        size: number;
        identifier: string;
    };
};

export type CreateParticipantUserPayload = {
    email: string;
    fullName: string;
    password: string;
    companyId: number;
};

export type AuthService = {
    login: ({ email, password }: LoginBodyType) => Promise<UserType>;
    register: ({
        email,
        password,
        fullName,
        role,
        company,
        identifier,
    }: CreateUserBodyType) => Promise<UserType>;
    updatePassword: (
        userId: number,
        oldPassword: string,
        newPassword: string
    ) => Promise<object>;
};

export type AuthHandler = {
    login: (
        request: FastifyRequest<{
            Body: LoginBodyType;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    register: (
        request: FastifyRequest<{
            Body: CreateUserBodyType;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    updatePassword: (
        request: FastifyRequest<{
            Body: UpdatePasswordBodyType;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};
