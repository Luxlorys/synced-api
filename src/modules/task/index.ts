import { FastifyInstance } from "fastify";
import { createTaskRoutes } from "./task.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/task";

export default async function (fastify: FastifyInstance) {
    const taskHandler = fastify.di.resolve("taskHandler");
    createTaskRoutes(fastify, taskHandler);
}
