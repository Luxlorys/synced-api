import { FastifyInstance } from "fastify";
import { TaskHandler } from "./task.types.js";
import {
    createTaskBodySchema,
    getTaskResponseSchema,
} from "@/lib/validation/task/task.schema.js";

enum TaskRoutes {
    CREATE = "/",
}

export const createTaskRoutes = (
    fastify: FastifyInstance,
    taskHandler: TaskHandler
) => {
    fastify.post(
        TaskRoutes.CREATE,
        {
            preHandler: [fastify.authenticate],
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
};
