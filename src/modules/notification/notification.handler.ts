import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { NotificationHandler, NotificationService } from "./notification.types.js";

export const createNotificationHandler = (notificationService: NotificationService): NotificationHandler => {
    return {
        getAllNotifications: async (request, reply) => {
            const { data: { id }} = request.user;

            const notifications = await notificationService.getAllNotifications(id);

            reply.status(200).send(notifications);
        },
    };
};

addDIResolverName(createNotificationHandler, "notificationHandler");