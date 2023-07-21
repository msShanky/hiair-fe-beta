/*
  Warnings:

  - Added the required column `availablePosition` to the `candidate_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_request" ADD COLUMN     "availablePosition" INTEGER NOT NULL,
ADD COLUMN     "expected_joining_date" TEXT[],
ADD COLUMN     "key_skills" TEXT[],
ADD COLUMN     "optional_skills" TEXT[];
