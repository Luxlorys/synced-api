import cron from "node-cron";
import { FastifyInstance } from "fastify";
import { NotificationOrchestrationService } from "./notification.types.js";

export const scheduleMissedDeadlineNotificationJob = (
    fastify: FastifyInstance
) => {
    cron.schedule("0 */8 * * *", async () => {
        const checkInService =
            fastify.di.resolve<NotificationOrchestrationService>(
                "notificationOtchestrationService"
            );

        await checkInService.createMissedDeadlineNotification();
    });
};
