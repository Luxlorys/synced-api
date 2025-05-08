import { z } from "zod";
import { FastifyInstance } from "fastify";
import { CompanyHandler } from "./company.types.js";
import { getCompanyResponseSchema } from "@/lib/validation/company/company.schema.js";

enum CompanyRoutes {
    COMPANIES = "/",
}

export const createCompanyRoutes = (
    fastify: FastifyInstance,
    companyHandler: CompanyHandler
) => {
    fastify.get(
        `${CompanyRoutes.COMPANIES}:id`,
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Company"],
                params: z.object({ id: z.string() }),
                response: {
                    200: getCompanyResponseSchema,
                },
            },
        },
        companyHandler.getCompanyById
    );
};
