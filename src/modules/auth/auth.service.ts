import { hashing } from "@/lib/hashing/hashing.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserRepository } from "@/database/repositories/user/user.repository.js";
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from "@/lib/errors/errors.js";
import {
    CreateUserType,
    LoginUserType,
    UserType,
} from "@/lib/validation/auth/auth.schema.js";

export type AuthService = {
    login: ({ email, password }: LoginUserType) => Promise<UserType>;
    register: ({ email, password, code }: CreateUserType) => Promise<UserType>;
    updatePassword: (
        userId: number,
        oldPassword: string,
        newPassword: string
    ) => Promise<object>;
};

export const createauthService = (
    userRepository: UserRepository
): AuthService => ({
    login: async ({ email, password }) => {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const validatePassword = await hashing.comparePassword(
            password,
            user.password
        );

        if (!validatePassword) {
            throw new UnauthorizedError("Wrong password");
        }

        return user;
    },
    register: async ({ email, password, code }) => {
        const user = await userRepository.findByEmail(email);

        if (user) {
            throw new ConflictError("User already exests");
        }

        const hashedPassword = await hashing.hashPassword(password);

        const createUserResult = await userRepository.create({
            data: {
                email,
                password: hashedPassword,
                role: code ? "Participant" : "Admin",
            },
        });

        return createUserResult;
    },
    updatePassword: async (
        id: number,
        oldPassword: string,
        newPassword: string
    ) => {
        const user = await userRepository.findUniqueOrFail({
            where: { id },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const validatePassword = await hashing.comparePassword(
            oldPassword,
            user.password
        );

        if (!validatePassword) {
            throw new UnauthorizedError("Wrong old password");
        }

        const newHashedPassword = await hashing.hashPassword(newPassword);

        await userRepository.update({
            where: {
                id,
            },
            data: {
                password: newHashedPassword,
            },
        });

        return {};
    },
});

addDIResolverName(createauthService, "authService");
