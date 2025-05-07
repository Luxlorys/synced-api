import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { PrismaAwaited } from "@/database/prisma/prisma.type.js";
import { BaseRepository, generateRepository } from "../generate.repository.js";

export type CompanyRepository = BaseRepository<"company"> & {
    findUniqueOrFail: (
        payload: Prisma.CompanyFindUniqueArgs
    ) => PrismaAwaited<PrismaClient["company"]["findUnique"]>;
};

export const createCompanyRepository = (
    prisma: PrismaClient
): CompanyRepository => {
    const repository = generateRepository(prisma, "Company");

    return {
        ...repository,
        findUniqueOrFail: async (args) => {
            const company = await prisma.company.findUnique(args);

            if (!company) {
                throw new NotFoundError("Company not found.");
            }

            return company;
        },
    };
};

addDIResolverName(createCompanyRepository, "companyRepository");
