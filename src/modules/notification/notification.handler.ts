import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { NotificationHandler, NotificationService } from "./notification.types.js";

export const createNotificationHandler = (notificationService: NotificationService): NotificationHandler => {
    return {
        getAllNotifications: async (request, reply) => {
            const { data: { id }} = request.user;

            const notifications = await notificationService.getAllNotifications(id);

            reply.status(200).send(notifications);
        },

        updateStatus: async (request, reply) => {
            const { data: { id }} = request.user;

            await notificationService.updateStatus(id);

            reply.status(200).send();
        },
    };
};

addDIResolverName(createNotificationHandler, "notificationHandler");