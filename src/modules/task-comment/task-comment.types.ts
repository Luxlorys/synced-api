import { FastifyReply, FastifyRequest } from "fastify";
import { BasePagination } from "@/lib/validation/mutual/mutual.schema.js";
import { BaseIdParam } from "@/lib/validation/base-params/base-params.schema.js";
import {
    CreateTaskCommentBody,
    GetAllTaskComments,
    GetTaskCommentsResponse,
} from "@/lib/validation/task-comment/task-comment.schema.js";

export type TaskCommentHandler = {
    createTask: (
        request: FastifyRequest<{
            Body: CreateTaskCommentBody;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    getTaskComments: (
        request: FastifyRequest<{
            Querystring: BasePagination;
            Params: BaseIdParam;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    deleteTaskComment: (
        request: FastifyRequest<{
            Params: BaseIdParam;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export type TaskCommentService = {
    createTask: (
        payload: CreateTaskCommentBody,
        authorId: number
    ) => Promise<GetTaskCommentsResponse>;
    getAllTaskComments: (
        query: BasePagination,
        taskId: number
    ) => Promise<GetAllTaskComments>;
    deleteTaskComment: (commentId: number) => Promise<object>;
};
