import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { CompanyHandler, CompanyService } from "./company.types.js";

export const createCompanyHandler = (
    companyService: CompanyService
): CompanyHandler => {
    return {
        getCompanyById: async (request, reply) => {
            const { id } = request.params;

            const company = await companyService.getCompanyById(id);

            reply.code(200).send(company);
        },

        updateCompany: async (request, reply) => {
            const { id } = request.params;

            const updatedCompany = await companyService.updateCompany(
                request.body,
                id
            );

            reply.code(200).send(updatedCompany);
        },

        deleteParticipant: async (request, reply) => {
            const { userId } = request.body;

            await companyService.deleteParticipant(userId);

            reply.code(200).send();
        },

        getCompanyParticipants: async (request, reply) => {
            const { id } = request.params;
            const query = request.query;

            const participants = await companyService.getCompanyParticipants(query, id);

            reply.status(200).send(participants);
        },
    };
};

addDIResolverName(createCompanyHandler, "companyHandler");
