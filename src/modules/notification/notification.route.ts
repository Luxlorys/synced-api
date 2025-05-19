import { FastifyInstance } from "fastify";
import { NotificationHandler } from "./notification.types.js";
import { getAllNotificationsResponseSchema } from "@/lib/validation/notification/notification.schema.js";

enum NotificationRoutes {
    BASE = "/",
}

export const createNotificationRoutes = (
    fastify: FastifyInstance,
    notificationHandler: NotificationHandler
) => {
    fastify.get(
        NotificationRoutes.BASE,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Notifications"],
                response: {
                    200: getAllNotificationsResponseSchema,
                },
            },
        },
        notificationHandler.getAllNotifications
    );
};
