import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { TaskRepository } from "./task.repository.types.js";
import { generateRepository } from "../generate.repository.js";

export const createTaskRepository = (prisma: PrismaClient): TaskRepository => {
    const repository = generateRepository(prisma, "Task");

    return {
        ...repository,
        findUniqueOrFail: async (args) => {
            const task = await prisma.task.findUnique(args);

            if (!task) {
                throw new NotFoundError("Task not found");
            }

            return task;
        },
    };
};

addDIResolverName(createTaskRepository, "taskRepository");
