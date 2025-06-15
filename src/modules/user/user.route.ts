import { z } from "zod";
import { FastifyInstance } from "fastify";
import { UserHandler } from "./user.types.js";
import { basePaginationScema } from "@/lib/validation/mutual/mutual.schema.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import {
    getUserResponseSchema,
    getUsersTasksResponseSchema,
    updateUserBodySchema,
} from "@/lib/validation/user/user.schema.js";

export const createUserRoutes = (
    fastify: FastifyInstance,
    userHandler: UserHandler
) => {
    fastify.get(
        "/:id",
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
        "/:id",
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
        "/:id",
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
        "/tasks/:id",
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
