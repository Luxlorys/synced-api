import { User } from "./user.type.js";
import { AwilixContainer } from "awilix";
import { EnvConfig } from "./env.type.js";
import { PrismaClient } from "@prisma/client";
import { Cradle } from "./di-cointainer.type.js";
import { FastifyBaseLogger, FastifyInstance } from "fastify";

declare module "fastify" {
    export interface FastifyInstance {
        config: EnvConfig;
        prisma: PrismaClient;
        di: AwilixContainer<Cradle>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authenticate: any;
    }

    export interface FastifyRequest {
        fastify: FastifyInstance;
        user: User;
    }
}

declare module "@fastify/awilix" {
    interface Cradle {
        log: FastifyBaseLogger;
        prisma: PrismaClient;
        config: EnvConfig;
        fastify: FastifyInstance;
    }
}
