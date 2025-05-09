import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserHandler, UserService } from "./user.types.js";

export const createUserHandler = (userService: UserService): UserHandler => {
    return {
        getUserById: async (request, reply) => {
            const { id } = request.params;

            const user = await userService.getUserById(id);

            reply.status(200).send(user);
        },
        updateUserById: async (request, reply) => {
            const { id } = request.params;
            const payload = request.body;

            const updatedUser = await userService.updateUserById(payload, id);

            reply.status(200).send(updatedUser);
        },
        deleteUserById: async (request, reply) => {
            const { id } = request.params;

            await userService.deleteUserById(id);

            reply.status(200).send();
        },
        getUsersTasks: async (request, reply) => {
            const querystring = request.query;
            const { id } = request.params;

            const tasks = await userService.getUsersTasks(
                querystring,
                id
            );

            reply.status(200).send(tasks);
        },
    };
};

addDIResolverName(createUserHandler, "userHandler");
