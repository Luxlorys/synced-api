import { z } from "zod";
import { FastifyInstance } from "fastify";
import { NotificationHandler } from "./notification.types.js";
import { getAllNotificationsResponseSchema } from "@/lib/validation/notification/notification.schema.js";

enum NotificationRoutes {
    BASE = "/",
    UPDATE_READ_STATUS = "/update-notifications-status"
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

    fastify.patch(
        NotificationRoutes.UPDATE_READ_STATUS,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Notifications"],
                response: {
                    200: z.object({}),
                },
            },
        },
        notificationHandler.updateStatus
    );
};
