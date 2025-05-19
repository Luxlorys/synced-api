import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { TaskCommentService } from "./task-comment.types.js";
import { TaskRepository } from "@/database/repositories/task/task.repository.types.js";
import { NotificationOrchestrationService } from "../notification/notification.types.js";
import {
    taskCommentDefaultSelect,
    TaskCommentRepository,
} from "@/database/repositories/task-comment/task-comment.repository.types.js";

export const createTaskCommentService = (
    taskCommentRepository: TaskCommentRepository,
    notificationOtchestrationService: NotificationOrchestrationService,
    taskRepository: TaskRepository
): TaskCommentService => ({
    createTaskComment: async (payload, authorId) => {
        const { assignedToId } = await taskRepository.findUniqueOrFail({
            where: { id: payload.taskId },
            select: { assignedToId: true },
        });

        const comment = await taskCommentRepository.create({
            data: {
                text: payload.text,
                authorId: authorId,
                taskId: payload.taskId,
            },
            select: taskCommentDefaultSelect,
        });

        if (assignedToId) {
            notificationOtchestrationService.createTaskCommentedNotification({
                assignerId: assignedToId,
                data: {
                    authorFullName: comment.author.fullName,
                    comment: comment.text,
                    taskId: payload.taskId,
                },
            });
        }

        return comment;
    },

    getAllTaskComments: async (query, taskId) => {
        const comments = await taskCommentRepository.findMany({
            where: {
                taskId,
            },
            skip: query.skip,
            take: query.take,
            select: taskCommentDefaultSelect,
        });

        return {
            comments: comments,
        };
    },

    deleteTaskComment: async (commentId) => {
        await taskCommentRepository.delete({
            where: {
                id: commentId,
            },
        });

        return {};
    },
});

addDIResolverName(createTaskCommentService, "taskCommentService");
