import { z } from "zod";
import { FastifyInstance } from "fastify";
import { AuthHandler } from "./models.js";
import {
    createUserBodySchema,
    loginBodySchema,
    loginResponseSchema,
    updatePasswordBodySchema,
} from "@/lib/validation/auth/auth.schema.js";

enum authRoutes {
    LOGIN = "/sign-in",
    SIGN_UP = "/sign-up",
    UPDATE_PASSWORD = "/update-password",
}

export const createAuthRoutes = (
    fastify: FastifyInstance,
    authHandler: AuthHandler
) => {
    fastify.post(
        authRoutes.LOGIN,
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
        authRoutes.SIGN_UP,
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
        authRoutes.UPDATE_PASSWORD,
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
