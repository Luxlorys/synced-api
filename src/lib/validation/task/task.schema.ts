import { z } from "zod";

export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]);

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

const baseTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: TaskPriorityEnum,
    status: TaskStatusEnum,
    estimatedTime: z.number().int(),
});

export const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: TaskPriorityEnum,
    status: TaskStatusEnum,
    estimatedTime: z.number().int(),
    assignedToId: z.number(),
    deadline: z.string().datetime(),
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>;

export const getTaskResponseSchema = baseTaskSchema.extend({
    assignedTo: z.object({
        fullName: z.string(),
        email: z.string().email(),
    }),
    id: z.number(),
    spentTime: z.number().nullable(),
    createdAt: z.date(),
    lastUpdated: z.date().nullable(),
    deadline: z.date(),
});

export type GetTaskResponse = z.infer<typeof getTaskResponseSchema>;

export const getAllTasksSchema = z.object({
    tasks: z.array(getTaskResponseSchema)
});

export type GetAllTasksResponse = z.infer<typeof getAllTasksSchema>;

export const getAllTasksQuerySchema = z.object({
    skip: z
        .string()
        .transform((val) => Number(val))
        .optional()
        .default("0"),
    take: z
        .string()
        .transform((val) => Number(val))
        .optional()
        .default("10"),
});

export type GetAllTasksQuery = z.infer<typeof getAllTasksQuerySchema>;

export const updateTaskBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    priority: TaskPriorityEnum.optional(),
    status: TaskStatusEnum.optional(),
    estimatedTime: z.number().int().optional(),
    deadline: z.string().datetime().optional(),
    spentTime: z.number().nullable().optional(),
    assignedToId: z.number().optional(),
});

export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>;
