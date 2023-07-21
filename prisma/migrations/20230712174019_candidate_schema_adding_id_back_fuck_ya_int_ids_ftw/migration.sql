/*
  Warnings:

  - The `id` column on the `candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `candidateId` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" ADD COLUMN     "candidateId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "candidate_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "candidate_candidateId_idx" ON "candidate"("candidateId");
