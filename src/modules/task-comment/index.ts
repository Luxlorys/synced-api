import { FastifyInstance } from "fastify";
import { createTaskCommentRoutes } from "./task-comment.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/task-comment";

export default async function (fastify: FastifyInstance) {
    const taskCommentHandler = fastify.di.resolve("taskCommentHandler");
    createTaskCommentRoutes(fastify, taskCommentHandler);
}