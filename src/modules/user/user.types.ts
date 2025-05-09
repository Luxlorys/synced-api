import { FastifyReply, FastifyRequest } from "fastify";
import {
    GetUserResponse,
    GetUsersTasksParams,
    GetUsersTasksResponse,
    UpdateUserBody,
} from "@/lib/validation/user/user.schema.js";

export type UserService = {
    getUserById: (id: number) => Promise<GetUserResponse>;
    deleteUserById: (id: number) => Promise<object>;
    updateUserById: (payload: UpdateUserBody, id: number) => Promise<GetUserResponse>;
    getUsersTasks: (
        querystring: GetUsersTasksParams,
        userId: number
    ) => Promise<GetUsersTasksResponse>;
};

export type UserHandler = {
    getUserById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    updateUserById: (
        request: FastifyRequest<{
            Params: { id: number };
            Body: UpdateUserBody,
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    deleteUserById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    getUsersTasks: (
        request: FastifyRequest<{
            Params: { id: number };
            Querystring: GetUsersTasksParams;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};
