import { Prisma } from "@prisma/client";
import { BaseRepository } from "../generate.repository.js";
import { GetFindResult } from "@prisma/client/runtime/library";

export type TaskCommentRepository = BaseRepository<"taskComment"> & {
    findUniqueOrFail: <T extends Prisma.TaskCommentFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.TaskCommentFindUniqueArgs>
    ) => Promise<GetFindResult<Prisma.$TaskCommentPayload, T, object>>;
};

export const taskCommentDefaultSelect = {
    id: true,
    author: true,
    text: true,
    createdAt: true,
} satisfies Prisma.TaskCommentSelect;

export const taskCommentSelectExtended = {
    ...taskCommentDefaultSelect,
    task: true,
} satisfies Prisma.TaskCommentSelect;
