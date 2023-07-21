/*
  Warnings:

  - You are about to drop the column `desired_location` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `candidate` table. All the data in the column will be lost.
  - Added the required column `ref_id` to the `candidate_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "desired_location",
DROP COLUMN "skills";

-- AlterTable
ALTER TABLE "candidate_request" ADD COLUMN     "ref_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "candidate_skill_mapping" (
    "candidateId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "candidate_skill_mapping_pkey" PRIMARY KEY ("candidateId","skillId")
);

-- CreateTable
CREATE TABLE "candidate_desired_location_mapping" (
    "candidateId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "candidate_desired_location_mapping_pkey" PRIMARY KEY ("candidateId","locationId")
);

-- AddForeignKey
ALTER TABLE "candidate_skill_mapping" ADD CONSTRAINT "candidate_skill_mapping_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skill_mapping" ADD CONSTRAINT "candidate_skill_mapping_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_desired_location_mapping" ADD CONSTRAINT "candidate_desired_location_mapping_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_desired_location_mapping" ADD CONSTRAINT "candidate_desired_location_mapping_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
