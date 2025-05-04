import { UserService } from "./user.service.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { addDIResolverName } from "@/lib/awilix/awilix.js";

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

export const createUserHandler = (userService: UserService): UserHandler => {
    return {
        getUserById: async (request, reply) => {
            const { id } = request.params;

            const user = await userService.getUserById(Number(id));

            reply.status(200).send(user);
        },
        deleteUserById: async (request, reply) => {
            const { id } = request.params;

            await userService.deleteUserById(Number(id));

            reply.status(200).send();
        },
    };
};

addDIResolverName(createUserHandler, "userHandler");
