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

enum CompanyRoutes {
    RUD = "/:id",
    DELETE_PARTICIPANT = "/delete-participant",
    PARTICIPANTS = "/:id/participants",
}

export const createCompanyRoutes = (
    fastify: FastifyInstance,
    companyHandler: CompanyHandler
) => {
    fastify.get(
        CompanyRoutes.RUD,
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
        CompanyRoutes.RUD,
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
        CompanyRoutes.DELETE_PARTICIPANT,
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
        CompanyRoutes.PARTICIPANTS,
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
