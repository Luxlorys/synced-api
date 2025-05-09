import { FastifyReply, FastifyRequest } from "fastify";
import {
    GetCompanyResponse,
    UpdateCompanyBody,
} from "@/lib/validation/company/company.schema.js";

export type CompanyHandler = {
    getCompanyById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    updateCompany: (
        request: FastifyRequest<{
            Body: UpdateCompanyBody;
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
    deleteParticipant: (
        request: FastifyRequest<{
            Body: { userId: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export type CompanyService = {
    getCompanyById: (id: number) => Promise<GetCompanyResponse>;
    updateCompany: (payload: UpdateCompanyBody, companyId: number) => Promise<GetCompanyResponse>;
    deleteParticipant: (userId: number) => Promise<object>;
};
