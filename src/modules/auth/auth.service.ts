import { AuthService } from "./auth.types..js";
import { hashing } from "@/lib/hashing/hashing.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { generateRandomCode } from "@/lib/helpers/generateRandomCode.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";
import { CompanyRepository } from "@/database/repositories/company/company.repository.types.js";
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from "@/lib/errors/errors.js";

export const createauthService = (
    userRepository: UserRepository,
    companyRepository: CompanyRepository
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
    register: async ({
        email,
        password,
        fullName,
        role,
        company,
        identifier,
    }) => {
        const user = await userRepository.findByEmail(email);

        if (user) {
            throw new ConflictError("User already exists");
        }

        const hashedPassword = await hashing.hashPassword(password);

        if (role === "ADMIN") {
            const companyIdentifier = generateRandomCode(4);

            const createdUser = await userRepository.createAdminUser({
                fullName,
                password: hashedPassword,
                email,
                company: {
                    identifier: companyIdentifier,
                    name: company!.name,
                    size: company!.size,
                },
            });

            return createdUser;
        }

        const companyByIdentifier = await companyRepository.findUniqueOrFail({
            where: {
                identifier,
            },
        });

        const createdUser = await userRepository.createPaticipantUser({
            companyId: companyByIdentifier.id,
            email,
            fullName,
            password: hashedPassword,
        });

        return createdUser;
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
