import { EnvConfig } from "./env.type.js";
import { FastifyBaseLogger } from "fastify";
import { PrismaClient } from "@prisma/client/extension";
import { UserService } from "@/modules/user/user.service.js";
import { UserHandler } from "@/modules/user/user.handler.js";
import { AuthHandler, AuthService } from "@/modules/auth/models.js";
import { CompanyHandler, CompanyService } from "@/modules/company/models.js";
import { UserRepository } from "@/database/repositories/user/user.repository.js";
import { CompanyRepository } from "@/database/repositories/company/company.repository.js";

export type Cradle = {
    log: FastifyBaseLogger;
    prisma: PrismaClient;
    config: EnvConfig;

    companyService: CompanyService;
    companyHandler: CompanyHandler;

    companyRepository: CompanyRepository;

    userService: UserService;
    userHandler: UserHandler;

    userRepository: UserRepository;

    authService: AuthService;
    authHandler: AuthHandler;
};
