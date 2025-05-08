import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { TaskHandler, TaskService } from "./task.types.js";

export const createTaskHandler = (taskService: TaskService): TaskHandler => {
    return {
        createTask: async (request, reply) => {
            const {
                data: { id },
            } = request.user;

            const payload = request.body;

            const createdTask = await taskService.createTask(payload, id);

            reply.code(200).send(createdTask);
        },

        updateTask: async (request, reply) => {
            const { id } = request.params;
            const payload = request.body;

            const updatedTask = await taskService.updateTask(
                payload,
                Number(id)
            );

            reply.code(200).send(updatedTask);
        },

        deleteTask: async (request, reply) => {
            const { id } = request.params;

            await taskService.deleteTask(Number(id));

            reply.code(200).send();
        },
    };
};

addDIResolverName(createTaskHandler, "taskHandler");
