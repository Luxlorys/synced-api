import { z } from "zod";
import { FastifyInstance } from "fastify";
import { AuthHandler } from "./auth.handler.js";
import {
    createUserSchema,
    loginUserSchema,
    loginSchema,
    updatePasswordSchema,
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
                body: loginUserSchema,
                response: {
                    200: loginSchema,
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
                body: createUserSchema,
                response: {
                    200: loginSchema,
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
                body: updatePasswordSchema,
                response: {
                    200: z.object({}),
                },
            },
        },
        authHandler.updatePassword
    );
};
