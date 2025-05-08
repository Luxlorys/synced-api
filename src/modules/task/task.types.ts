import { FastifyReply, FastifyRequest } from "fastify";
import {
    CreateTaskBody,
    GetTaskResponse,
} from "@/lib/validation/task/task.schema.js";

export type TaskHandler = {
    createTask: (
        request: FastifyRequest<{
            Body: CreateTaskBody;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    // getTaskById: (
    //     request: FastifyRequest<{
    //         Params: { id: string };
    //     }>,
    //     reply: FastifyReply
    // ) => Promise<void>;
    // deleteTaskById: (
    //     request: FastifyRequest<{
    //         Params: { id: string };
    //     }>,
    //     reply: FastifyReply
    // ) => Promise<void>;
};

export type TaskService = {
    // getTaskById: (id: number) => Promise<GetTaskResponse>;
    // deleteTaskById: (id: number) => Promise<object>;
    createTask: (
        payload: CreateTaskBody,
        userId: number
    ) => Promise<GetTaskResponse>;
};
