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

enum TaskRoutes {
    CREATE_GETALL = "/",
    RUD = "/:id",
}

export const createTaskRoutes = (
    fastify: FastifyInstance,
    taskHandler: TaskHandler
) => {
    fastify.get(
        TaskRoutes.RUD,
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
        TaskRoutes.CREATE_GETALL,
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
        TaskRoutes.RUD,
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
        TaskRoutes.RUD,
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
        TaskRoutes.CREATE_GETALL,
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
