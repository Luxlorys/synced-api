import { Prisma } from "@prisma/client";
import { BaseRepository } from "../generate.repository.js";

export type NotificationRepository = BaseRepository<"notification"> & {};

export const notificationDefaultSelect = {
    id: true,
    createdAt: true,
    notificationStatus: true,
    data: true,
    notificationType: true,
} satisfies Prisma.NotificationSelect;
