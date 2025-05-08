import { NotFoundError } from "@/lib/errors/errors.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { UserType } from "@/lib/validation/user/user.schema.js";
import { UserRepository } from "@/database/repositories/user/user.repository.types.js";

export type UserService = {
    getUserById: (id: number) => Promise<UserType>;
    deleteUserById: (id: number) => Promise<object>;
};

export const createuserService = (
    userRepository: UserRepository
): UserService => ({
    getUserById: async (id: number) => {
        const user = await userRepository.findUniqueOrFail({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                lastUpdated: true,
                role: true,
                company: true,
                companyId: true,
                fullName: true,
                adminOfCompany: true,
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    },
    deleteUserById: async (id: number) => {
        const user = await userRepository.findUniqueOrFail({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        await userRepository.delete({
            where: {
                id,
            },
        });

        return {};
    },
});

addDIResolverName(createuserService, "userService");
