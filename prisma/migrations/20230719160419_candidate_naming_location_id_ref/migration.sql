/*
  Warnings:

  - You are about to drop the column `location` on the `candidate` table. All the data in the column will be lost.
  - The primary key for the `candidate_desired_location_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidateId` on the `candidate_desired_location_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `candidate_desired_location_mapping` table. All the data in the column will be lost.
  - The primary key for the `candidate_skill_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidateId` on the `candidate_skill_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `candidate_skill_mapping` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_id` to the `candidate_desired_location_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `candidate_desired_location_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_id` to the `candidate_skill_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill_id` to the `candidate_skill_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidate_desired_location_mapping" DROP CONSTRAINT "candidate_desired_location_mapping_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "candidate_desired_location_mapping" DROP CONSTRAINT "candidate_desired_location_mapping_locationId_fkey";

-- DropForeignKey
ALTER TABLE "candidate_skill_mapping" DROP CONSTRAINT "candidate_skill_mapping_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "candidate_skill_mapping" DROP CONSTRAINT "candidate_skill_mapping_skillId_fkey";

-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "location",
ADD COLUMN     "location_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "candidate_desired_location_mapping" DROP CONSTRAINT "candidate_desired_location_mapping_pkey",
DROP COLUMN "candidateId",
DROP COLUMN "locationId",
ADD COLUMN     "candidate_id" INTEGER NOT NULL,
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD CONSTRAINT "candidate_desired_location_mapping_pkey" PRIMARY KEY ("candidate_id", "location_id");

-- AlterTable
ALTER TABLE "candidate_skill_mapping" DROP CONSTRAINT "candidate_skill_mapping_pkey",
DROP COLUMN "candidateId",
DROP COLUMN "skillId",
ADD COLUMN     "candidate_id" INTEGER NOT NULL,
ADD COLUMN     "skill_id" INTEGER NOT NULL,
ADD CONSTRAINT "candidate_skill_mapping_pkey" PRIMARY KEY ("candidate_id", "skill_id");

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skill_mapping" ADD CONSTRAINT "candidate_skill_mapping_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skill_mapping" ADD CONSTRAINT "candidate_skill_mapping_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_desired_location_mapping" ADD CONSTRAINT "candidate_desired_location_mapping_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_desired_location_mapping" ADD CONSTRAINT "candidate_desired_location_mapping_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
