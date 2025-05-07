import { PrismaClient, Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserType } from "@/lib/validation/user/user.schema.js";
import { PrismaAwaited } from "@/database/prisma/prisma.type.js";
import { BaseRepository, generateRepository } from "../generate.repository.js";
import {
    CreateAdminUserPayload,
    CreateParticipantUserPayload,
} from "@/modules/auth/models.js";

export type UserRepository = BaseRepository<"user"> & FindUniqueOrFail;

type FindUniqueOrFail = {
    findUniqueOrFail: (
        payload: Prisma.UserFindUniqueArgs
    ) => PrismaAwaited<PrismaClient["user"]["findUnique"]>;

    findByEmail: (
        email: string
    ) => PrismaAwaited<PrismaClient["user"]["findUnique"]>;

    createAdminUser: (payload: CreateAdminUserPayload) => Promise<UserType>;
    createPaticipantUser: (
        payload: CreateParticipantUserPayload
    ) => Promise<UserType>;
};

export const createUserRepository = (prisma: PrismaClient): UserRepository => {
    const repository = generateRepository(prisma, "User");

    return {
        ...repository,
        findUniqueOrFail: async (args) => {
            const user = await prisma.user.findUnique(args);

            if (!user) {
                throw new NotFoundError("User not found.");
            }

            return user;
        },
        findByEmail: async (email: string) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            return user;
        },
        createAdminUser: async ({ company, email, fullName, password }) => {
            const createdUser = prisma.$transaction(async (tx) => {
                const createdUser = await tx.user.create({
                    data: {
                        email,
                        fullName,
                        password,
                        role: "Admin",
                    },
                });

                const createdCompany = await tx.company.create({
                    data: {
                        name: company.name,
                        size: company.size,
                        identifier: company.identifier,
                        adminId: createdUser.id,
                        users: {
                            connect: [{ id: createdUser.id }],
                        },
                    },
                });

                const updatedUser = await tx.user.update({
                    where: { id: createdUser.id },
                    data: {
                        companyId: createdCompany.id,
                    },
                    omit: {
                        password: true,
                    },
                });

                return updatedUser;
            });

            return createdUser;
        },
        createPaticipantUser: async ({
            companyId,
            email,
            fullName,
            password,
        }) => {
            const createdUser = await prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        email,
                        fullName,
                        password,
                        role: "Participant",
                        companyId: companyId,
                    },
                    omit: {
                        password: true,
                    },
                });

                await tx.company.update({
                    where: {
                        id: companyId,
                    },
                    data: {
                        users: {
                            connect: user,
                        },
                    },
                });

                return user;
            });

            return createdUser;
        },
    };
};

addDIResolverName(createUserRepository, "userRepository");
