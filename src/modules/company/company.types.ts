import { FastifyReply, FastifyRequest } from "fastify";

export type CompanyHandler = {
    getCompanyById: (
        request: FastifyRequest<{
            Params: { id: number };
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export type CompanyService = {
    getCompanyById: (id: number) => Promise<Company>;
};

type BaseUser = {
    fullName: string;
    email: string;
};

export type Company = {
    id: number;
    name: string;
    size: number;
    identifier: string;
    createdAt: Date;
    admin: BaseUser;
    users: BaseUser[];
};
