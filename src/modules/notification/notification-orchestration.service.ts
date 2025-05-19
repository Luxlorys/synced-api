import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { NotificationOrchestrationService } from "./notification.types.js";
import { NotificationRepository } from "@/database/repositories/notification/notification.repository.types.js";

export const createNotificationOtchestrationService = (
    notificationRepository: NotificationRepository
): NotificationOrchestrationService => ({
    createMissedDeadlineNotification: async (payload) => {
        await notificationRepository.create({
            data: {
                notificationStatus: "UNVIEWED",
                notificationType: "MISSED_DEADLINE",
                data: JSON.stringify(payload.data),
                userId: payload.assignerId,
            },
        });
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
