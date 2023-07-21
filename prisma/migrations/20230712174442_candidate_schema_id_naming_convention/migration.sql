/*
  Warnings:

  - You are about to drop the column `candidateId` on the `candidate` table. All the data in the column will be lost.
  - Added the required column `candidate_id` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "candidate_candidateId_idx";

-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "candidateId",
ADD COLUMN     "candidate_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "candidate_candidate_id_idx" ON "candidate"("candidate_id");
