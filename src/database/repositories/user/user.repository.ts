import { PrismaClient } from "@prisma/client";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { generateRepository } from "../generate.repository.js";
import { BadRequestError, NotFoundError } from "@/lib/errors/errors.js";
import {
    userDefaultSelect,
    UserRepository,
    userSelectWithPassword,
} from "./user.repository.types.js";

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
                select: userSelectWithPassword,
            });

            return user;
        },
        createAdminUser: async ({ company, email, fullName, password }) => {
            const user = prisma.$transaction(async (tx) => {
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
                    select: userDefaultSelect,
                });

                return updatedUser;
            });

            return user;
        },
        createPaticipantUser: async ({
            companyId,
            email,
            fullName,
            password,
        }) => {
            const { "0": companySize, "1": userCount } = await Promise.all([
                prisma.company.findUnique({
                    where: { id: companyId },
                    select: { size: true },
                }),
                prisma.user.count({
                    where: { companyId },
                }),
            ]);            

            if (companySize?.size === userCount) {
                throw new BadRequestError("Company exceed it's size limit");
            }

            const user = await prisma.$transaction(async (tx) => {
                const createdUser = await tx.user.create({
                    data: {
                        email,
                        fullName,
                        password,
                        role: "Participant",
                        companyId: companyId,
                    },
                    select: userDefaultSelect,
                });

                await tx.company.update({
                    where: {
                        id: companyId,
                    },
                    data: {
                        users: {
                            connect: createdUser,
                        },
                    },
                });

                return createdUser;
            });

            return user;
        },
    };
};

addDIResolverName(createUserRepository, "userRepository");
