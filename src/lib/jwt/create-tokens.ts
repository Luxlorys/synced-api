import { FastifyInstance } from "fastify";
import {
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES,
} from "@/constants/token-expiration-dates.js";

export const createTokens = (fastify: FastifyInstance, data: unknown) => {
    const jwt = fastify.jwt.sign({ data }, { expiresIn: ACCESS_TOKEN_EXPIRES });

    const refreshToken = fastify.jwt.sign(
        { data },
        { expiresIn: REFRESH_TOKEN_EXPIRES }
    );

    return {
        jwt,
        refreshToken,
    };
};
