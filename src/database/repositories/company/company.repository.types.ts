import { Prisma } from "@prisma/client";
import { BaseRepository } from "../generate.repository.js";
import { GetFindResult } from "@prisma/client/runtime/library";

export type CompanyRepository = BaseRepository<"company"> & {
    findUniqueOrFail: <T extends Prisma.CompanyFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.CompanyFindUniqueArgs>
    ) => Promise<GetFindResult<Prisma.$CompanyPayload, T, object>>;
};
