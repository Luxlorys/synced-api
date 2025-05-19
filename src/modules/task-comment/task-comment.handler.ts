import { addDIResolverName } from "@/lib/awilix/awilix.js";
import {
    TaskCommentHandler,
    TaskCommentService,
} from "./task-comment.types.js";

export const createTaskCommentHandler = (
    taskCommentService: TaskCommentService
): TaskCommentHandler => {
    return {
        createTask: async (request, reply) => {
            const {
                data: { id },
            } = request.user;

            const payload = request.body;

            const createdComment = await taskCommentService.createTaskComment(
                payload,
                id
            );

            reply.status(200).send(createdComment);
        },

        getTaskComments: async (request, reply) => {
            const { id } = request.params;
            const query = request.query;

            const tasks = await taskCommentService.getAllTaskComments(
                query,
                id
            );

            reply.status(200).send(tasks);
        },

        deleteTaskComment: async (request, reply) => {
            const { id } = request.params;

            await taskCommentService.deleteTaskComment(id);

            reply.status(200).send();
        },
    };
};

addDIResolverName(createTaskCommentHandler, "taskCommentHandler");
