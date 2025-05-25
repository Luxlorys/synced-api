import cron from "node-cron";
import { FastifyInstance } from "fastify";
import {
    NotificationOrchestrationService,
    NotificationService,
} from "./notification.types.js";

export const scheduleMissedDeadlineNotificationJob = (
    fastify: FastifyInstance
) => {
    cron.schedule("0 */8 * * *", async () => {
        const notificationOtchestrationService =
            fastify.di.resolve<NotificationOrchestrationService>(
                "notificationOtchestrationService"
            );

        await notificationOtchestrationService.createMissedDeadlineNotification();
    });
};

export const scheduleDeleteViewedNotifications = (fastify: FastifyInstance) => {
    cron.schedule("0 */12 * * *", async () => {
        const notificationService = fastify.di.resolve<NotificationService>(
            "notificationService"
        );

        await notificationService.deleteViewedNotifications();
    });
};
