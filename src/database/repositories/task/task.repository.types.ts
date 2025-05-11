import { Prisma } from "@prisma/client";
import { BaseRepository } from "../generate.repository.js";
import { GetFindResult } from "@prisma/client/runtime/library";

export type TaskRepository = BaseRepository<"task"> & {
    findUniqueOrFail: <T extends Prisma.TaskFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>
    ) => Promise<GetFindResult<Prisma.$TaskPayload, T, object>>;
};

export const taskDefaultSelect = {
    id: true,
    title: true,
    description: true,
    deadline: true,
    priority: true,
    status: true,
    estimatedTime: true,
    spentTime: true,
    createdAt: true,
    lastUpdated: true,
} satisfies Prisma.TaskSelect;

export const taskExtendedSelect = {
    assignedTo: true,
    ...taskDefaultSelect,
} satisfies Prisma.TaskSelect;
