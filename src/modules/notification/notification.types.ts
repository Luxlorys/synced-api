import { TaskPriority } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllNotificationsResponse } from "@/lib/validation/notification/notification.schema.js";

export type NotificationHandler = {
    getAllNotifications: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void>;
    updateStatus: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void>;
};

export type NotificationService = {
    getAllNotifications: (userId: number) => Promise<GetAllNotificationsResponse>;
    updateStatus: (userId: number) => Promise<void>;
};

export type NotificationOrchestrationService = {
    createTaskAssignedNotification: (
        payload: TaskAssignedNotificationPayload
    ) => Promise<void>;
    createUpdatedTaskNotification: (
        payload: UpdateTaskNotificationPayload
    ) => Promise<void>;
    createMissedDeadlineNotification: (
        payload: MissedDeadlineNotificationPayload
    ) => Promise<void>;
    createTaskCommentedNotification: (
        payload: TaskCommentedNotificationPayload
    ) => Promise<void>;
};

export type TaskAssignedNotificationPayload = {
    assignerId: number;
    data: {
        taskTitle: string;
        deadline: Date;
        priority: TaskPriority;
        taskId: number;
    };
};

export type UpdateTaskNotificationPayload = {
    assignerId: number;
    data: {
        taskId: number;
        taskTitle: string;
        deadline: Date;
        priority: TaskPriority;
    };
};

export type MissedDeadlineNotificationPayload = {
    assignerId: number;
    data: {
        taskTitle: string;
        deadline: Date;
        taskId: number;
    };
};

export type TaskCommentedNotificationPayload = {
    assignerId: number;
    data: {
        comment: string;
        taskId: number;
        authorFullName: string;
    };
};
