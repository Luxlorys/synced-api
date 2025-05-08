/*
  Warnings:

  - Added the required column `companyId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_identifier_key" ON "company"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "company_adminId_key" ON "company"("adminId");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "email_unique" RENAME TO "user_email_key";
