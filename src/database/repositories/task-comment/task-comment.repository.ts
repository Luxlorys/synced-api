import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { generateRepository } from "../generate.repository.js";
import { TaskCommentRepository } from "./task-comment.repository.types.js";

export const createTaskCommentRepository = (
    prisma: PrismaClient
): TaskCommentRepository => {
    const repository = generateRepository(prisma, "TaskComment");

    return {
        ...repository,
        findUniqueOrFail: async (args) => {
            const task = await prisma.taskComment.findUnique(args);

            if (!task) {
                throw new NotFoundError("Task not found");
            }

            return task;
        },
    };
};

addDIResolverName(createTaskCommentRepository, "taskCommentRepository");
