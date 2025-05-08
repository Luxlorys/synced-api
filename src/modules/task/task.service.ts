import { TaskService } from "./task.types.js";
import { ForbiddenError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import {
    taskExtendedSelect,
    TaskRepository,
} from "@/database/repositories/task/task.repository.types.js";

export const createtaskService = (
    taskRepository: TaskRepository,
    userRepository: UserRepository
): TaskService => ({
    createTask: async (payload, userId) => {
        const user = await userRepository.findUnique({
            where: {
                id: userId,
            },
            select: {
                adminOfCompany: true,
                companyId: true,
            },
        });

        if (!user?.adminOfCompany || !user.companyId) {
            throw new ForbiddenError("This user cannot create tasks");
        }

        const createdTask = await taskRepository.create({
            data: {
                title: payload.title,
                description: payload.description,
                deadline: payload.deadline,
                estimatedTime: payload.estimatedTime,
                priority: payload.priority,
                status: payload.status,
                creatorId: userId,
                companyId: user.companyId,
            },
            select: taskExtendedSelect,
        });

        return createdTask;
    },
});

addDIResolverName(createtaskService, "taskService");
