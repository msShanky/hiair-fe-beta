-- CreateTable
CREATE TABLE "CompanyInformation" (
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
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "CompanyInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompanyMapping" (
    "companyId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserCompanyMapping_pkey" PRIMARY KEY ("companyId","userId")
);

-- CreateTable
CREATE TABLE "CandidateRequest" (
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

    CONSTRAINT "CandidateRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateTuning" (
    "id" SERIAL NOT NULL,
    "skillWeight" INTEGER NOT NULL,
    "experienceWeight" INTEGER NOT NULL,
    "salaryWeight" INTEGER NOT NULL,
    "locationWeight" INTEGER NOT NULL,
    "noticePeriodWeight" INTEGER NOT NULL,
    "candidateRequestId" INTEGER NOT NULL,

    CONSTRAINT "CandidateTuning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCompanyMapping" ADD CONSTRAINT "UserCompanyMapping_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyMapping" ADD CONSTRAINT "UserCompanyMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateRequest" ADD CONSTRAINT "CandidateRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateRequest" ADD CONSTRAINT "CandidateRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateTuning" ADD CONSTRAINT "CandidateTuning_candidateRequestId_fkey" FOREIGN KEY ("candidateRequestId") REFERENCES "CandidateRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
