import { z } from "zod";
import { FastifyInstance } from "fastify";
import { CompanyHandler } from "./company.types.js";
import { basePaginationScema } from "@/lib/validation/mutual/mutual.schema.js";
import { baseIdParamSchema } from "@/lib/validation/base-params/base-params.schema.js";
import {
    deleteParticipantFromCompanyBodySchema,
    getCompanyParticipantsResponseSchema,
    getCompanyResponseSchema,
    updateCompanyBodySchema,
} from "@/lib/validation/company/company.schema.js";

export const createCompanyRoutes = (
    fastify: FastifyInstance,
    companyHandler: CompanyHandler
) => {
    fastify.get(
        "/:id",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Company"],
                params: baseIdParamSchema,
                response: {
                    200: getCompanyResponseSchema,
                },
            },
        },
        companyHandler.getCompanyById
    );

    fastify.patch(
        "/:id",
        {
            preHandler: [fastify.authenticate, fastify.checkAdminPermissions],
            schema: {
                tags: ["Company"],
                params: baseIdParamSchema,
                body: updateCompanyBodySchema,
                response: {
                    200: getCompanyResponseSchema,
                },
            },
        },
        companyHandler.updateCompany
    );

    fastify.delete(
        "/delete-participant",
        {
            preHandler: [fastify.authenticate, fastify.checkAdminPermissions],
            schema: {
                tags: ["Company"],
                body: deleteParticipantFromCompanyBodySchema,
                response: {
                    200: z.object({}),
                },
            },
        },
        companyHandler.deleteParticipant
    );

    fastify.get(
        "/:id/participants",
        {
            preHandler: [fastify.authenticate],
            schema: {
                tags: ["Company"],
                params: baseIdParamSchema,
                querystring: basePaginationScema,
                response: {
                    200: getCompanyParticipantsResponseSchema,
                },
            },
        },
        companyHandler.getCompanyParticipants
    );
};
