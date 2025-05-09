import { CompanyService } from "./company.types.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import {
    companyDefaultSelect,
    CompanyRepository,
} from "@/database/repositories/company/company.repository.types.js";

export const createcompanyService = (
    companyRepository: CompanyRepository,
    userRepository: UserRepository,
): CompanyService => ({
    getCompanyById: async (id) => {
        const company = await companyRepository.findUniqueOrFail({
            where: {
                id,
            },
            select: companyDefaultSelect,
        });

        return company;
    },

    updateCompany: async (payload, companyId) => {
        const updatedCompany = await companyRepository.update({
            where: {
                id: companyId,
            },
            data: {
                ...payload,
            },
            select: companyDefaultSelect,
        });

        return updatedCompany;
    },

    deleteParticipant: async (userId) => {
        await userRepository.delete({
            where: { id: userId },
        });

        return {};
    },
});

addDIResolverName(createcompanyService, "companyService");
