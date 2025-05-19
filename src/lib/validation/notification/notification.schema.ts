import { z } from "zod";

const notificationStatusEnum = z.enum(["VIEWED", "UNVIEWED"]);

const notificationTypeEnum = z.enum([
    "TASK_ASSIGNED",
    "TASK_UPDATED",
    "MISSED_DEADLINE",
    "TASK_COMMENTED",
]);

const notificationSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    data: z.record(z.unknown()),
    notificationType: notificationTypeEnum,
    notificationStatus: notificationStatusEnum,
});

export const getAllNotificationsResponseSchema = z.object({
    notifications: z.array(notificationSchema),
});

export type GetAllNotificationsResponse = z.infer<typeof getAllNotificationsResponseSchema>;