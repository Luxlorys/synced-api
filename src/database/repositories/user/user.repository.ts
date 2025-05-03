import { PrismaClient, Prisma } from "@prisma/client";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { PrismaAwaited } from "@/database/prisma/prisma.type.js";
import { BaseRepository, generateRepository } from "../generate.repository.js";

export type UserRepository = BaseRepository<"user"> & FindUniqueOrFail;

type FindUniqueOrFail = {
    findUniqueOrFail: (
        payload: Prisma.UserFindUniqueArgs
    ) => PrismaAwaited<PrismaClient["user"]["findUnique"]>;

    findByEmail: (
        email: string
    ) => PrismaAwaited<PrismaClient["user"]["findUnique"]>;
};

export const createUserRepository = (prisma: PrismaClient): UserRepository => {
    const repository = generateRepository(prisma, "User");

    return {
        ...repository,
        findUniqueOrFail: async (args) => {
            const user = await prisma.user.findUnique(args);

            if (!user) {
                throw new Error("User not found.");
            }

            return user;
        },
        findByEmail: async (email: string) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error("User not found.");
            }

            return user;
        },
    };
};

addDIResolverName(createUserRepository, "userRepository");
