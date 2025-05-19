import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { NotificationService } from "./notification.types.js";
import { notificationDefaultSelect, NotificationRepository } from "@/database/repositories/notification/notification.repository.types.js";

export const createnotificationService = (notificationRepository: NotificationRepository): NotificationService => ({
    getAllNotifications: async (userId) => {
        const notifications = await notificationRepository.findMany({
            where: {
                userId,
            },
            select: notificationDefaultSelect,
        });

        const adaptedNotifications = notifications.map(notification => ({
            ...notification,
            data: JSON.parse(notification.data as string),
        }));        

        return {
            notifications: adaptedNotifications
        };
    },
});

addDIResolverName(createnotificationService, "notificationService");