/*
  Warnings:

  - Added the required column `status` to the `candidate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_size` to the `company_information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_type` to the `company_information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_request" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "company_information" ADD COLUMN     "company_size" INTEGER NOT NULL,
ADD COLUMN     "company_type" TEXT NOT NULL,
ADD COLUMN     "facebookLink" TEXT,
ADD COLUMN     "linkedinLink" TEXT,
ADD COLUMN     "twitterLink" TEXT;

-- AlterTable
ALTER TABLE "user_company_mapping" ADD COLUMN     "currentRole" TEXT;
