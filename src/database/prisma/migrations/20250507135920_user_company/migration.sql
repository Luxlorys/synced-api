/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_adminId_key" ON "company"("adminId");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
