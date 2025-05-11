import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { TaskCommentService } from "./task-comment.types.js";
import {
    taskCommentDefaultSelect,
    TaskCommentRepository,
} from "@/database/repositories/task-comment/task-comment.repository.types.js";

export const createtaskCommentService = (
    taskCommentRepository: TaskCommentRepository
): TaskCommentService => ({
    createTask: async (payload, authorId) => {
        const comment = await taskCommentRepository.create({
            data: {
                text: payload.text,
                authorId: authorId,
                taskId: payload.taskId,
            },
            select: taskCommentDefaultSelect,
        });

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

addDIResolverName(createtaskCommentService, "taskCommentService");
