import { z } from "zod";
import { FastifyInstance } from "fastify";
import { UserHandler } from "./user.types.js";
import { basePaginationScema } from "@/lib/validation/mutual/mutual.schema.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import { getUserResponseSchema, getUsersTasksResponseSchema, updateUserBodySchema } from "@/lib/validation/user/user.schema.js";

enum UserRoutes {
    USER = "/:id",
    USER_TASKS = "/tasks/:id"
}

export const createUserRoutes = (
    fastify: FastifyInstance,
    userHandler: UserHandler
) => {
    fastify.get(
        UserRoutes.USER,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: baseIdParamSchema,
                response: {
                    200: getUserResponseSchema,
                },
            },
        },
        userHandler.getUserById
    );

    fastify.patch(
        UserRoutes.USER,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: baseIdParamSchema,
                body: updateUserBodySchema,
                response: {
                    200: getUserResponseSchema,
                },
            },
        },
        userHandler.updateUserById
    );

    fastify.delete(
        UserRoutes.USER,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: baseIdParamSchema,
                response: {
                    200: getUserResponseSchema,
                },
            },
        },
        userHandler.deleteUserById
    );

    fastify.get(
        UserRoutes.USER_TASKS,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["User"],
                params: z.object({ id: z.string() }),
                querystring: basePaginationScema,
                response: {
                    200: getUsersTasksResponseSchema,
                },
            },
        },
        userHandler.getUsersTasks
    );
};
