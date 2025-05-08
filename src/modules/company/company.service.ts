import { CompanyService } from "./company.types.js";
import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { CompanyRepository } from "@/database/repositories/company/company.repository.types.js";

export const createcompanyService = (
    companyRepository: CompanyRepository
): CompanyService => ({
    getCompanyById: async (id) => {
        const company = await companyRepository.findUnique({
            where: {
                id,
            },
            select: {
                admin: {
                    select: {
                        email: true,
                        fullName: true,
                    },
                },
                users: {
                    select: {
                        email: true,
                        fullName: true,
                    },
                },
                id: true,
                size: true,
                identifier: true,
                createdAt: true,
                name: true,
            },
        });

        if (!company) {
            throw new NotFoundError("Company not found");
        }

        return company;
    },
});

addDIResolverName(createcompanyService, "companyService");
