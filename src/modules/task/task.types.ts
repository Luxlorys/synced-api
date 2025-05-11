import { FastifyReply, FastifyRequest } from "fastify";
import { BaseIdParam } from "@/lib/validation/base-params/base-params.schema.js";
import {
    CreateTaskBody,
    GetAllTasksResponse,
    GetTaskResponse,
    GetTasksPagination,
    UpdateTaskBody,
} from "@/lib/validation/task/task.schema.js";

export type TaskHandler = {
    getTaskById: (
        request: FastifyRequest<{
            Params: BaseIdParam;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
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
    getAllTasks: (
        request: FastifyRequest<{
            Querystring: GetTasksPagination
        }>,
        reply: FastifyReply,
    ) => Promise<void>;
};

export type TaskService = {
    getTaskById: (id: number) => Promise<GetTaskResponse>;
    createTask: (
        payload: CreateTaskBody,
        userId: number
    ) => Promise<GetTaskResponse>;
    updateTask: (
        payload: UpdateTaskBody,
        userId: number
    ) => Promise<GetTaskResponse>;
    deleteTask: (taskId: number) => Promise<object>;
    getAllTasks: (query: GetTasksPagination, userId: number) => Promise<GetAllTasksResponse>
};
