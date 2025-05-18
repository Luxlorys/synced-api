/*
  Warnings:

  - The values [Admin,Participant] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `created_at` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `last_update` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `taskComment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_update` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TASK_ASSIGNED', 'TASK_UPDATED', 'MISSED_DEADLINE', 'TASK_COMMENTED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('VIEWED', 'UNVIEWED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'PARTICIPANT');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "company" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "created_at",
DROP COLUMN "last_update",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastUpdated" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "taskComment" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
DROP COLUMN "last_update",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastUpdated" TIMESTAMPTZ(6);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMPTZ(6),
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "notificationStatus" "NotificationStatus" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
