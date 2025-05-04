import { AuthService } from "./auth.service.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { createTokens } from "@/lib/jwt/create-tokens.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import {
    CreateUserType,
    LoginUserType,
} from "@/lib/validation/auth/auth.schema.js";

export type AuthHandler = {
    login: (
        request: FastifyRequest<{
            Body: LoginUserType;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    register: (
        request: FastifyRequest<{
            Body: CreateUserType;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export const createAuthHandler = (authService: AuthService): AuthHandler => {
    return {
        login: async (request, reply) => {
            const { email, password } = request.body;

            const user = await authService.login({ email, password });

            const { jwt, refreshToken } = createTokens(request.server, {
                email: user.email,
                id: user.id,
            });

            reply.status(200).send({
                authentication: {
                    accessToken: jwt,
                    refreshToken,
                },
                user: user,
            });
        },
        register: async (request, reply) => {
            const { email, password, code } = request.body;

            const user = await authService.register({ password, code, email });

            const { jwt, refreshToken } = createTokens(request.server, {
                email: user.email,
                id: user.id,
            });

            reply.status(200).send({
                authentication: {
                    accessToken: jwt,
                    refreshToken,
                },
                user: user,
            });
        },
    };
};

addDIResolverName(createAuthHandler, "authHandler");
