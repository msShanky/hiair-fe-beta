/*
  Warnings:

  - You are about to drop the `CandidateRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CandidateTuning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCompanyMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CandidateRequest" DROP CONSTRAINT "CandidateRequest_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateRequest" DROP CONSTRAINT "CandidateRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateTuning" DROP CONSTRAINT "CandidateTuning_candidateRequestId_fkey";

-- DropForeignKey
ALTER TABLE "UserCompanyMapping" DROP CONSTRAINT "UserCompanyMapping_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserCompanyMapping" DROP CONSTRAINT "UserCompanyMapping_userId_fkey";

-- DropTable
DROP TABLE "CandidateRequest";

-- DropTable
DROP TABLE "CandidateTuning";

-- DropTable
DROP TABLE "CompanyInformation";

-- DropTable
DROP TABLE "UserCompanyMapping";

-- CreateTable
CREATE TABLE "company_information" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "expected_hiring_count" INTEGER NOT NULL,
    "industry" TEXT,
    "domain" TEXT,
    "website" TEXT,
    "contactInfo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "company_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_company_mapping" (
    "companyId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "user_company_mapping_pkey" PRIMARY KEY ("companyId","userId")
);

-- CreateTable
CREATE TABLE "candidate_request" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "role_category" TEXT,
    "industry" TEXT,
    "minExperience" INTEGER NOT NULL,
    "maxExperience" INTEGER NOT NULL,
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "education" TEXT,
    "job_location" TEXT[],
    "mode_of_work" TEXT,
    "job_type" TEXT,
    "employment_type" TEXT,
    "functional_area" TEXT,
    "companyId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "candidate_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_tuning" (
    "id" SERIAL NOT NULL,
    "skillWeight" INTEGER NOT NULL,
    "experienceWeight" INTEGER NOT NULL,
    "salaryWeight" INTEGER NOT NULL,
    "locationWeight" INTEGER NOT NULL,
    "noticePeriodWeight" INTEGER NOT NULL,
    "candidateRequestId" INTEGER NOT NULL,

    CONSTRAINT "candidate_tuning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_company_mapping" ADD CONSTRAINT "user_company_mapping_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_company_mapping" ADD CONSTRAINT "user_company_mapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_request" ADD CONSTRAINT "candidate_request_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_request" ADD CONSTRAINT "candidate_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_tuning" ADD CONSTRAINT "candidate_tuning_candidateRequestId_fkey" FOREIGN KEY ("candidateRequestId") REFERENCES "candidate_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
