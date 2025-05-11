import { z } from "zod";

export const getTaskCommentsResponseSchema = z.object({
    id: z.number(),
    text: z.string(),
    author: z.object({
        fullName: z.string(),
    }),
    createdAt: z.date(),
});

export type GetTaskCommentsResponse = z.infer<
    typeof getTaskCommentsResponseSchema
>;

export const getAllTaskCommentsSchema = z.object({
    comments: z.array(getTaskCommentsResponseSchema),
});

export type GetAllTaskComments = z.infer<typeof getAllTaskCommentsSchema>;

export const createTaskCommentBodySchema = z.object({
    taskId: z.number().int(),
    text: z.string().min(1, "Comment text is required"),
});

export type CreateTaskCommentBody = z.infer<typeof createTaskCommentBodySchema>;
