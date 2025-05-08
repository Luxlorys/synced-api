import { createTokens } from "@/lib/jwt/create-tokens.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { AuthHandler, AuthService } from "./auth.types..js";

export const createAuthHandler = (authService: AuthService): AuthHandler => {
    return {
        login: async (request, reply) => {
            const { email, password } = request.body;

            const user = await authService.login({ email, password });

            const { jwt, refreshToken } = createTokens(request.server, {
                data: {
                    email: user.email,
                    id: user.id,
                },
            });

            reply.status(200).send({
                authentication: {
                    accessToken: jwt,
                    refreshToken,
                },
                user: user,
            });
        },
        register: async (request, reply) => {
            const userBody = request.body;

            const user = await authService.register(userBody);

            const { jwt, refreshToken } = createTokens(request.server, {
                data: {
                    email: user.email,
                    id: user.id,
                },
            });

            reply.status(200).send({
                authentication: {
                    accessToken: jwt,
                    refreshToken,
                },
                user: user,
            });
        },
        updatePassword: async (request, reply) => {
            const {
                data: { id },
            } = request.user;

            const { newPassword, oldPassword } = request.body;

            await authService.updatePassword(id, oldPassword, newPassword);

            reply.status(200).send();
        },
    };
};

addDIResolverName(createAuthHandler, "authHandler");
