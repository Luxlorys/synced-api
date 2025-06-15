import { z } from "zod";
import { FastifyInstance } from "fastify";
import { NotificationHandler } from "./notification.types.js";
import { getAllNotificationsResponseSchema } from "@/lib/validation/notification/notification.schema.js";

export const createNotificationRoutes = (
    fastify: FastifyInstance,
    notificationHandler: NotificationHandler
) => {
    fastify.get(
        "/",
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
        "/update-notifications-status",
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
