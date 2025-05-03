import { FastifyRequest } from "fastify";
import {
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES,
} from "@/constants/token-expiration-dates.js";

export const createTokens = (request: FastifyRequest, data: unknown) => {
    const jwt = request.fastify.jwt.sign(
        {
            data,
        },
        {
            expiresIn: ACCESS_TOKEN_EXPIRES,
        }
    );

    const refreshToken = request.fastify.jwt.sign(
        {
            data,
        },
        {
            expiresIn: REFRESH_TOKEN_EXPIRES,
        }
    );

    return {
        jwt,
        refreshToken,
    };
};
