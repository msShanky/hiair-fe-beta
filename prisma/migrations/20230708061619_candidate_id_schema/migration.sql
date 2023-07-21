/*
  Warnings:

  - You are about to drop the column `canidate_id` on the `candidate` table. All the data in the column will be lost.
  - The required column `candidate_id` was added to the `candidate` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "canidate_id",
ADD COLUMN     "candidate_id" TEXT NOT NULL;
