/*
  Warnings:

  - You are about to drop the column `adminId` on the `company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_adminId_fkey";

-- DropIndex
DROP INDEX "company_adminId_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "adminId";
