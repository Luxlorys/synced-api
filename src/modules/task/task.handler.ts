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
    };
};

addDIResolverName(createTaskHandler, "taskHandler");
