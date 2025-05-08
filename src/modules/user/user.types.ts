import { FastifyReply, FastifyRequest } from "fastify";
import { UserType } from "@/lib/validation/user/user.schema.js";

export type UserService = {
    getUserById: (id: number) => Promise<UserType>;
    deleteUserById: (id: number) => Promise<object>;
};

export type UserHandler = {
    getUserById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    deleteUserById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};
