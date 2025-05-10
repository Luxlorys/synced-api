import { CompanyService } from "./company.types.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import {
    companyDefaultSelect,
    CompanyRepository,
} from "@/database/repositories/company/company.repository.types.js";

export const createcompanyService = (
    companyRepository: CompanyRepository,
    userRepository: UserRepository
): CompanyService => ({
    getCompanyById: async (id) => {
        return await companyRepository.findUniqueOrFail({
            where: {
                id,
            },
            select: companyDefaultSelect,
        });
    },

    updateCompany: async (payload, companyId) => {
        await companyRepository.findUniqueOrFail({
            where: {
                id: companyId,
            },
        });

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
        await userRepository.findUniqueOrFail({
            where: { id: userId },
        });

        await userRepository.delete({
            where: { id: userId },
        });

        return {};
    },
});

addDIResolverName(createcompanyService, "companyService");
