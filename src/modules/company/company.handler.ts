import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { CompanyHandler, CompanyService } from "./models.js";

export const createCompanyHandler = (
    companyService: CompanyService
): CompanyHandler => {
    return {
        getCompanyById: async (request, reply) => {
            const { id } = request.params;

            const company = await companyService.getCompanyById(Number(id));

            reply.code(200).send(company);
        },
    };
};

addDIResolverName(createCompanyHandler, "companyHandler");
