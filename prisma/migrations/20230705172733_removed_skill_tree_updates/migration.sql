/*
  Warnings:

  - You are about to drop the column `preffered_location` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `uId` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the `service_domain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill_category` table. If the table is not empty, all the data it contains will be lost.
  - The required column `canidateId` was added to the `candidate` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "skill_category" DROP CONSTRAINT "skill_category_service_domain_id_fkey";

-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "preffered_location",
DROP COLUMN "uId",
ADD COLUMN     "canidateId" TEXT NOT NULL,
ADD COLUMN     "desired_location" TEXT[];

-- DropTable
DROP TABLE "service_domain";

-- DropTable
DROP TABLE "skill";

-- DropTable
DROP TABLE "skill_category";
