import fp from "fastify-plugin";
import { ForbiddenError } from "@/lib/errors/errors.js";
import { FastifyInstance, FastifyRequest } from "fastify";

const configureAdminPermissionsCheck = async (fastify: FastifyInstance) => {
    fastify.decorate(
        "checkAdminPermissions",
        async (request: FastifyRequest) => {
            if (request.user.data.role !== "Admin") {
                throw new ForbiddenError(
                    "You do not have permissions to perform this request"
                );
            }
        }
    );
};

export default fp(configureAdminPermissionsCheck, {
    name: "checkAdminPermissions",
});
