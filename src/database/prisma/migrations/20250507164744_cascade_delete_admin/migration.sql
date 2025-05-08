-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_adminId_fkey";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
