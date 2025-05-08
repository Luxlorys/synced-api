import { FastifyReply, FastifyRequest } from "fastify";
import {
    CreateTaskBody,
    GetTaskResponse,
    UpdateTaskBody,
} from "@/lib/validation/task/task.schema.js";

export type TaskHandler = {
    createTask: (
        request: FastifyRequest<{
            Body: CreateTaskBody;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    updateTask: (
        request: FastifyRequest<{
            Body: UpdateTaskBody;
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    deleteTask: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export type TaskService = {
    createTask: (
        payload: CreateTaskBody,
        userId: number
    ) => Promise<GetTaskResponse>;
    updateTask: (
        payload: UpdateTaskBody,
        userId: number
    ) => Promise<GetTaskResponse>;
    deleteTask: (taskId: number) => Promise<object>;
};
