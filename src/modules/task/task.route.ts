import { z } from "zod";
import { FastifyInstance } from "fastify";
import { TaskHandler } from "./task.types.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import {
    createTaskBodySchema,
    getAllTasksSchema,
    getTaskResponseSchema,
    getTasksPagination,
    updateTaskBodySchema,
} from "@/lib/validation/task/task.schema.js";

export const createTaskRoutes = (
    fastify: FastifyInstance,
    taskHandler: TaskHandler
) => {
    fastify.get(
        "/:id",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task"],
                params: baseIdParamSchema,
                response: {
                    200: getTaskResponseSchema,
                },
            },
        },
        taskHandler.getTaskById
    );

    fastify.post(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.checkAdminPermissions],
            schema: {
                tags: ["Task"],
                body: createTaskBodySchema,
                response: {
                    200: getTaskResponseSchema,
                },
            },
        },
        taskHandler.createTask
    );

    fastify.patch(
        "/:id",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task"],
                body: updateTaskBodySchema,
                params: baseIdParamSchema,
                response: {
                    200: getTaskResponseSchema,
                },
            },
        },
        taskHandler.updateTask
    );

    fastify.delete(
        "/:id",
        {
            preHandler: [fastify.authenticate, fastify.checkAdminPermissions],
            schema: {
                tags: ["Task"],
                params: baseIdParamSchema,
                response: {
                    200: z.object({}),
                },
            },
        },
        taskHandler.deleteTask
    );

    fastify.get(
        "/",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task"],
                querystring: getTasksPagination,
                response: {
                    200: getAllTasksSchema,
                },
            },
        },
        taskHandler.getAllTasksWithinCompany
    );
};
