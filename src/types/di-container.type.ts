import { EnvConfig } from "./env.type.js";
import { FastifyBaseLogger } from "fastify";
import { PrismaClient } from "@prisma/client/extension";
import { UserService } from "@/modules/user/user.service.js";
import { UserHandler } from "@/modules/user/user.handler.js";
import { AuthService } from "@/modules/auth/auth.service.js";
import { AuthHandler } from "@/modules/auth/auth.handler.js";
import { UserRepository } from "@/database/repositories/user/user.repository.js";

export type Cradle = {
    log: FastifyBaseLogger;
    prisma: PrismaClient;
    config: EnvConfig;

    userService: UserService;
    userHandler: UserHandler;

    userRepository: UserRepository;

    authService: AuthService;
    authHandler: AuthHandler;
};
