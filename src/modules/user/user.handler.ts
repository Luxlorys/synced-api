import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserHandler, UserService } from "./user.types.js";

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
