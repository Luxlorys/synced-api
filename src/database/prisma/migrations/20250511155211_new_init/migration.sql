/*
  Warnings:

  - Made the column `assignedToId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "assignedToId" SET NOT NULL;
