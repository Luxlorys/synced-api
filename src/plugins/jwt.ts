import fp from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";
import { FastifyInstance, FastifyRequest } from "fastify";
import { UnauthorizedError } from "@/lib/errors/errors.js";

const configureJwt = async (fastify: FastifyInstance) => {
    fastify.register(fastifyJWT, {
        secret: fastify.config.APPLICATION_SECRET,
    });

    fastify.decorate("authenticate", async (request: FastifyRequest) => {
        const token = request.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError("No token provided");
        }

        try {
            request.user = fastify.jwt.verify(token);

            return true;
        } catch {
            throw new UnauthorizedError("Invalid token");
        }
    });
};

export default fp(configureJwt, {
    name: "jwt",
    dependencies: ["env"],
});
