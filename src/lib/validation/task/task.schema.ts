import { z } from "zod";
import { basePaginationScema } from "../mutual/mutual.schema.js";

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
    assignedToId: z.number().nullable().optional(),
    deadline: z.string().datetime(),
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>;

export const getTaskResponseSchema = baseTaskSchema.extend({
    assignedTo: z.object({
        fullName: z.string(),
        email: z.string().email(),
    }).nullable(),
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

export const updateTaskBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    priority: TaskPriorityEnum.optional(),
    status: TaskStatusEnum.optional(),
    estimatedTime: z.number().int().optional(),
    deadline: z.string().datetime().optional(),
    spentTime: z.number().nullable().optional(),
    assignedToId: z.number().nullable().optional(),
});

export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>;

export const getTasksPagination = basePaginationScema.extend({
    query: z.string().optional(),
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
});

export type GetTasksPagination = z.infer<typeof getTasksPagination>;