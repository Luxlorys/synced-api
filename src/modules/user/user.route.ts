import { z } from "zod";
import { FastifyInstance } from "fastify";
import { UserHandler } from "./user.handler.js";
import { userSchema } from "@/lib/validation/auth/auth.schema.js";

enum UserRoutes {
    USER = "/",
}

export const createUserRoutes = (
    fastify: FastifyInstance,
    userHandler: UserHandler
) => {
    fastify.get(
        `${UserRoutes.USER}:id`,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: z.object({ id: z.string() }),
                response: {
                    200: userSchema,
                },
            },
        },
        userHandler.getUserById
    );

    fastify.delete(
        `${UserRoutes.USER}:id`,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: z.object({ id: z.string() }),
                response: {
                    200: z.object({}),
                },
            },
        },
        userHandler.deleteUserById
    );
};
