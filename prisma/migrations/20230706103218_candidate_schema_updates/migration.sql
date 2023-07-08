/*
  Warnings:

  - You are about to drop the column `canidateId` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `candidate` table. All the data in the column will be lost.
  - The required column `canidate_id` was added to the `candidate` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_user_id_fkey";

-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "canidateId",
DROP COLUMN "user_id",
ADD COLUMN     "canidate_id" TEXT NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
