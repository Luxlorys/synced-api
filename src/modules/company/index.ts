import { FastifyInstance } from "fastify";
import { createCompanyRoutes } from "./company.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/company";

export default async function (fastify: FastifyInstance) {
    const companyHandler = fastify.di.resolve("companyHandler");
    createCompanyRoutes(fastify, companyHandler);
}
