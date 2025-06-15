import { TaskService } from "./task.types.js";
import { getNowUTCDate } from "@/lib/helpers/Dates.js";
import { ForbiddenError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import { NotificationOrchestrationService } from "../notification/notification.types.js";
import {
    taskExtendedSelect,
    TaskRepository,
} from "@/database/repositories/task/task.repository.types.js";

export const createTaskService = (
    taskRepository: TaskRepository,
    userRepository: UserRepository,
    notificationOtchestrationService: NotificationOrchestrationService
): TaskService => ({
    getTaskById: async (id) => {
        const task = await taskRepository.findUniqueOrFail({
            where: {
                id,
            },
            select: taskExtendedSelect,
        });

        return task;
    },

    createTask: async (payload, userId) => {
        const { companyId } = await userRepository.findUniqueOrFail({
            where: { id: userId },
            select: { companyId: true },
        });

        if (!companyId) {
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
                companyId: companyId,
                assignedToId: payload.assignedToId,
            },
            select: taskExtendedSelect,
        });

        if (payload.assignedToId) {
            notificationOtchestrationService.createTaskAssignedNotification({
                assignerId: payload.assignedToId,
                data: {
                    deadline: createdTask.deadline,
                    priority: createdTask.priority,
                    taskTitle: createdTask.title,
                    taskId: createdTask.id,
                },
            });
        }

        return createdTask;
    },

    updateTask: async (payload, id) => {
        await taskRepository.findUniqueOrFail({
            where: {
                id,
            },
        });

        const updatedTask = await taskRepository.update({
            where: {
                id,
            },
            data: {
                ...payload,
                lastUpdated: getNowUTCDate(),
            },
            select: taskExtendedSelect,
        });

        if (updatedTask.assignedTo?.id) {
            notificationOtchestrationService.createUpdatedTaskNotification({
                assignerId: updatedTask.assignedTo.id,
                data: {
                    taskId: id,
                    deadline: updatedTask.deadline,
                    priority: updatedTask.priority,
                    taskTitle: updatedTask.title,
                },
            });
        }

        return updatedTask;
    },

    deleteTask: async (taskId) => {
        await taskRepository.findUniqueOrFail({
            where: {
                id: taskId,
            },
        });

        await taskRepository.delete({
            where: {
                id: taskId,
            },
        });

        return {};
    },

    getAllTasksWithinCompany: async (query, userId) => {
        const tasks = await taskRepository.findMany({
            orderBy: {
                deadline: "asc",
            },
            where: {
                company: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                title: {
                    contains: query.query,
                },
                status: query.status,
                priority: query.priority,
            },
            skip: query.skip,
            take: query.take,
            select: taskExtendedSelect,
        });

        return {
            tasks: tasks,
        };
    },
});

addDIResolverName(createTaskService, "taskService");
