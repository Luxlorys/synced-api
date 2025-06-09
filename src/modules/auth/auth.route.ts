import { z } from "zod";
import { FastifyInstance } from "fastify";
import { AuthHandler } from "./auth.types..js";
import {
    createUserBodySchema,
    loginBodySchema,
    loginResponseSchema,
    updatePasswordBodySchema,
} from "@/lib/validation/auth/auth.schema.js";

export const createAuthRoutes = (
    fastify: FastifyInstance,
    authHandler: AuthHandler
) => {
    fastify.post(
        "/sign-in",
        {
            schema: {
                tags: ["Auth"],
                body: loginBodySchema,
                response: {
                    200: loginResponseSchema,
                },
            },
        },
        authHandler.login
    );

    fastify.post(
        "/sign-up",
        {
            schema: {
                tags: ["Auth"],
                body: createUserBodySchema,
                response: {
                    200: loginResponseSchema,
                },
            },
        },
        authHandler.register
    );

    fastify.patch(
        "/update-password",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Auth"],
                body: updatePasswordBodySchema,
                response: {
                    200: z.object({}),
                },
            },
        },
        authHandler.updatePassword
    );
};
