import { UserService } from "./user.types.js";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
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
            select: {
                id: true,
                email: true,
                createdAt: true,
                lastUpdated: true,
                role: true,
                company: true,
                companyId: true,
                fullName: true,
                adminOfCompany: true,
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    },
    deleteUserById: async (id: number) => {
        const user = await userRepository.findUniqueOrFail({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        await userRepository.delete({
            where: {
                id,
            },
        });

        return {};
    },

    getUsersTasks: async (params, userId) => {
        const tasks = await taskRepository.findMany({
            where: {
                creatorId: userId,
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
