import { z } from "zod";
import { FastifyInstance } from "fastify";
import { TaskCommentHandler } from "./task-comment.types.js";
import { basePaginationScema } from "@/lib/validation/mutual/mutual.schema.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import {
    createTaskCommentBodySchema,
    getAllTaskCommentsSchema,
    getTaskCommentsResponseSchema,
} from "@/lib/validation/task-comment/task-comment.schema.js";

export const createTaskCommentRoutes = (
    fastify: FastifyInstance,
    taskCommentHandler: TaskCommentHandler
) => {
    fastify.post(
        "/",
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
        "/:id",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Task Comment"],
                querystring: basePaginationScema,
                params: baseIdParamSchema,
                response: {
                    200: getAllTaskCommentsSchema,
                },
            },
        },
        taskCommentHandler.getTaskComments
    );

    fastify.delete(
        "/:id",
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
