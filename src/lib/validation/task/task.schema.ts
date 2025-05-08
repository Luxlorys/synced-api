import { z } from "zod";

export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    deadline: z.string().datetime(),
    priority: TaskPriorityEnum,
    status: TaskStatusEnum,
    estimatedTime: z.number().int(),
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>;

export const getTaskResponseSchema = createTaskBodySchema.extend({
    creator: z.object({
        fullName: z.string(),
        email: z.string().email(),
    }),
    company: z.object({
        name: z.string(),
        size: z.number(),
    }),
    id: z.number(),
    spentTime: z.number().nullable(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
});

export type GetTaskResponse = z.infer<typeof getTaskResponseSchema>;
