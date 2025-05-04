import { FastifyInstance } from "fastify";
import { AuthHandler } from "./auth.handler.js";
import {
    createUserSchema,
    loginUserSchema,
    loginSchema,
} from "@/lib/validation/auth/auth.schema.js";

enum authRoutes {
    LOGIN = "/sign-in",
    SIGN_UP = "/sign-up",
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
};
