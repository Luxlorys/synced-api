import { z } from "zod";
import { FastifyInstance } from "fastify";
import { UserHandler } from "./user.types.js";
import { getUserResponseSchema, getUsersTasksParamsSchema, getUsersTasksResponseSchema } from "@/lib/validation/user/user.schema.js";

enum UserRoutes {
    USER = "/",
    USER_TASKS = "/tasks"
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
                    200: getUserResponseSchema,
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

    fastify.get(
        `${UserRoutes.USER_TASKS}/:id`,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: z.object({ id: z.string() }),
                querystring: getUsersTasksParamsSchema,
                response: {
                    200: getUsersTasksResponseSchema,
                },
            },
        },
        userHandler.getUsersTasks
    );
};
