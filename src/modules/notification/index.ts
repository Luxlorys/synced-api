import { FastifyInstance } from "fastify";
import { createNotificationRoutes } from "./notification.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/notification";

export default async function (fastify: FastifyInstance) {
    const notificationHandler = fastify.di.resolve("notificationHandler");
    createNotificationRoutes(fastify, notificationHandler);
}