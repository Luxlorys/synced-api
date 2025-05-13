import { Prisma } from "@prisma/client";
import { BaseRepository } from "../generate.repository.js";
import { GetFindResult } from "@prisma/client/runtime/library";
import {
    CreateAdminUserPayload,
    CreateParticipantUserPayload,
} from "@/modules/auth/auth.types..js";

export type UserRepository = BaseRepository<"user"> & {
    findUniqueOrFail: <T extends Prisma.UserFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
    ) => Promise<GetFindResult<Prisma.$UserPayload, T, object>>;

    findByEmail: (email: string) => Promise<Prisma.UserGetPayload<{
        select: typeof userSelectWithPassword;
    }> | null>;

    createAdminUser: (payload: CreateAdminUserPayload) => Promise<
        Prisma.UserGetPayload<{
            select: typeof userDefaultSelect;
            omit: {
                password: true;
                companyId: true;
            };
        }>
    >;
    createPaticipantUser: (payload: CreateParticipantUserPayload) => Promise<
        Prisma.UserGetPayload<{
            select: typeof userDefaultSelect;
            omit: {
                password: true;
                companyId: true;
            };
        }>
    >;
};

export const userShortSelect = {
    id: true,
    createdAt: true,
    email: true,
    role: true,
    fullName: true,
    lastUpdated: true,
} satisfies Prisma.UserSelect;

export const userDefaultSelect = {
    company: {
        select: {
            name: true,
            size: true,
            identifier: true,
        },
    },
    ...userShortSelect,
} satisfies Prisma.UserSelect;

export const userSelectWithPassword = {
    password: true,
    ...userDefaultSelect,
} satisfies Prisma.UserSelect;
