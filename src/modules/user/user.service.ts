import { UserService } from "./user.types.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import {
    userDefaultSelect,
    UserRepository,
} from "@/database/repositories/user/user.repository.types.js";
import {
    taskExtendedSelect,
    TaskRepository,
} from "@/database/repositories/task/task.repository.types.js";

export const createuserService = (
    userRepository: UserRepository,
    taskRepository: TaskRepository
): UserService => ({
    getUserById: async (id: number) => {
        const user = await userRepository.findUniqueOrFail({
            where: {
                id,
            },
            select: userDefaultSelect,
        });
        
        return user;
    },

    updateUserById: async (payload, id) => {
        await userRepository.findUniqueOrFail({
            where: {
                id,
            },
        });

        return await userRepository.update({
            where: {
                id,
            },
            data: {
                ...payload,
            },
            select: userDefaultSelect,
        });
    },

    deleteUserById: async (id: number) => {
        await userRepository.findUniqueOrFail({
            where: {
                id,
            },
        });

        await userRepository.delete({
            where: {
                id,
            },
        });

        return {};
    },

    getUsersTasks: async (params, userId) => {
        await userRepository.findUniqueOrFail({
            where: {
                id: userId,
            },
        });

        const tasks = await taskRepository.findMany({
            where: {
                assignedToId: userId,
            },
            skip: params.skip,
            take: params.take,
            select: taskExtendedSelect,
        });

        return {
            tasks: tasks,
        };
    },
});

addDIResolverName(createuserService, "userService");
