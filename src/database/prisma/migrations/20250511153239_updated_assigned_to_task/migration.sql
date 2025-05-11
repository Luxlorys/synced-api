/*
  Warnings:

  - You are about to drop the column `creatorId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_creatorId_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "creatorId",
ADD COLUMN     "assignedToId" INTEGER;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
