import { FastifyReply, FastifyRequest } from "fastify";
import { BasePagination } from "@/lib/validation/mutual/mutual.schema.js";
import {
    GetCompanyParticipantsResponse,
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
    getCompanyParticipants: (
        request: FastifyRequest<{
            Querystring: BasePagination,
            Params: { id: number }
        }>,
        reply: FastifyReply,
    ) => Promise<void>
};

export type CompanyService = {
    getCompanyById: (id: number) => Promise<GetCompanyResponse>;
    updateCompany: (payload: UpdateCompanyBody, companyId: number) => Promise<GetCompanyResponse>;
    deleteParticipant: (userId: number) => Promise<object>;
    getCompanyParticipants: (query: BasePagination, companyId: number) => Promise<GetCompanyParticipantsResponse>;
};
