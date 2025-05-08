import { EnvConfig } from "./env.type.js";
import { FastifyBaseLogger } from "fastify";
import { PrismaClient } from "@prisma/client/extension";
import { TaskService, TaskHandler } from "@/modules/task/task.types.js";
import { UserService, UserHandler } from "@/modules/user/user.types.js";
import { AuthHandler, AuthService } from "@/modules/auth/auth.types..js";
import { TaskRepository } from "@/database/repositories/task/task.repository.types.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import {
    CompanyHandler,
    CompanyService,
} from "@/modules/company/company.types.js";
import { CompanyRepository } from "@/database/repositories/company/company.repository.types.js";

export type Cradle = {
    log: FastifyBaseLogger;
    prisma: PrismaClient;
    config: EnvConfig;

    taskRepository: TaskRepository;

    taskService: TaskService;
    taskHandler: TaskHandler;

    companyService: CompanyService;
    companyHandler: CompanyHandler;

    companyRepository: CompanyRepository;

    userService: UserService;
    userHandler: UserHandler;

    userRepository: UserRepository;

    authService: AuthService;
    authHandler: AuthHandler;
};
