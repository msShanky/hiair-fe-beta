/*
  Warnings:

  - The primary key for the `candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `candidate` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birth_date" INTEGER,
ADD COLUMN     "birth_year" INTEGER,
ADD COLUMN     "certifications" JSONB,
ADD COLUMN     "county" TEXT,
ADD COLUMN     "expected_salary" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "last_initial" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "middle_initial" TEXT,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "summary" TEXT;
