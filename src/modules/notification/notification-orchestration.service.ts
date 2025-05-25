import { getNowUTCDate } from "@/lib/helpers/Dates.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { NotificationType, NotificationStatus } from "@prisma/client";
import { NotificationOrchestrationService } from "./notification.types.js";
import { TaskRepository } from "@/database/repositories/task/task.repository.types.js";
import { NotificationRepository } from "@/database/repositories/notification/notification.repository.types.js";

export const createNotificationOtchestrationService = (
    notificationRepository: NotificationRepository,
    taskRepository: TaskRepository
): NotificationOrchestrationService => ({
    createMissedDeadlineNotification: async () => {
        const assignedTasks = await taskRepository.findMany({
            where: {
                assignedToId: {
                    not: null,
                },
                status: {
                    in: ["IN_PROGRESS", "TODO", "BLOCKED"],
                },
                deadline: { lt: getNowUTCDate() },
            },
            select: {
                assignedToId: true,
                title: true,
                deadline: true,
            },
        });

        const notifications = assignedTasks.map((task) => ({
            notificationStatus: NotificationStatus.UNVIEWED,
            notificationType: NotificationType.MISSED_DEADLINE,
            data: JSON.stringify(task),
            userId: task.assignedToId!,
        }));

        if (notifications.length > 0) {
            await notificationRepository.createMany({ data: notifications });
        }
    },

    createTaskAssignedNotification: async (payload) => {
        await notificationRepository.create({
            data: {
                userId: payload.assignerId,
                data: JSON.stringify(payload.data),
                notificationStatus: "UNVIEWED",
                notificationType: "TASK_ASSIGNED",
            },
        });
    },

    createTaskCommentedNotification: async (payload) => {
        await notificationRepository.create({
            data: {
                userId: payload.assignerId,
                data: JSON.stringify(payload.data),
                notificationStatus: "UNVIEWED",
                notificationType: "TASK_COMMENTED",
            },
        });
    },

    createUpdatedTaskNotification: async (payload) => {
        await notificationRepository.create({
            data: {
                userId: payload.assignerId,
                data: JSON.stringify(payload.data),
                notificationStatus: "UNVIEWED",
                notificationType: "TASK_UPDATED",
            },
        });
    },
});

addDIResolverName(
    createNotificationOtchestrationService,
    "notificationOtchestrationService"
);
