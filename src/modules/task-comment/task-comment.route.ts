import { z } from "zod";
import { FastifyInstance } from "fastify";
import { TaskCommentHandler } from "./task-comment.types.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import {
    createTaskCommentBodySchema,
    getAllTaskCommentsSchema,
    getTaskCommentsQuerySchema,
    getTaskCommentsResponseSchema,
} from "@/lib/validation/task-comment/task-comment.schema.js";

enum TaskCommentRoutes {
    CREATE = "/",
    RUD = "/:id",
}

export const createTaskCommentRoutes = (
    fastify: FastifyInstance,
    taskCommentHandler: TaskCommentHandler
) => {
    fastify.post(
        TaskCommentRoutes.CREATE,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task Comment"],
                body: createTaskCommentBodySchema,
                response: {
                    200: getTaskCommentsResponseSchema,
                },
            },
        },
        taskCommentHandler.createTask
    );

    fastify.get(
        TaskCommentRoutes.RUD,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task Comment"],
                querystring: getTaskCommentsQuerySchema,
                params: baseIdParamSchema,
                response: {
                    200: getAllTaskCommentsSchema,
                },
            },
        },
        taskCommentHandler.getTaskComments
    );

    fastify.delete(
        TaskCommentRoutes.RUD,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task Comment"],
                params: baseIdParamSchema,
                response: {
                    200: z.object({}),
                },
            },
        },
        taskCommentHandler.deleteTaskComment
    );
};
