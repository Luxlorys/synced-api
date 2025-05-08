-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMPTZ(6),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "priority" "TaskPriority" NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "estimatedTime" INTEGER NOT NULL,
    "spentTime" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_id_idx" ON "task"("id");

-- CreateIndex
CREATE INDEX "task_status_idx" ON "task"("status");

-- CreateIndex
CREATE INDEX "task_priority_idx" ON "task"("priority");

-- CreateIndex
CREATE INDEX "company_id_idx" ON "company"("id");

-- CreateIndex
CREATE INDEX "company_identifier_idx" ON "company"("identifier");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
