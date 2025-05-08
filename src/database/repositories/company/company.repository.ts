import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { generateRepository } from "../generate.repository.js";
import { CompanyRepository } from "./company.repository.types.js";

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
