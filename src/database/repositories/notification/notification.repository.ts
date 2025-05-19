import { PrismaClient } from "@prisma/client";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { generateRepository } from "../generate.repository.js";
import { NotificationRepository } from "./notification.repository.types.js";

export const createNotificationRepository = (
    prisma: PrismaClient
): NotificationRepository => {
    const repository = generateRepository(prisma, "Notification");

    return {
        ...repository,
    };
};

addDIResolverName(createNotificationRepository, "notificationRepository");