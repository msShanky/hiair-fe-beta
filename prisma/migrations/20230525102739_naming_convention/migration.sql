/*
  Warnings:

  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceDomain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_job_pool_id_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SkillCategory" DROP CONSTRAINT "SkillCategory_service_domain_id_fkey";

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "JobPool";

-- DropTable
DROP TABLE "ServiceDomain";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SkillCategory";

-- CreateTable
CREATE TABLE "job_pool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "uId" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "current_location" TEXT,
    "preffered_location" TEXT[],
    "current_salary" DOUBLE PRECISION,
    "total_experience" DOUBLE PRECISION NOT NULL,
    "work_experience" JSONB,
    "education" JSONB,
    "skills" TEXT[],
    "notice_period" DOUBLE PRECISION,
    "job_pool_id" INTEGER,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_domain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_category" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "service_domain_id" INTEGER NOT NULL,

    CONSTRAINT "skill_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_job_pool_id_fkey" FOREIGN KEY ("job_pool_id") REFERENCES "job_pool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_category" ADD CONSTRAINT "skill_category_service_domain_id_fkey" FOREIGN KEY ("service_domain_id") REFERENCES "service_domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
