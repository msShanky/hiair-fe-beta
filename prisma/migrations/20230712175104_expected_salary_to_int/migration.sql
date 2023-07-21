/*
  Warnings:

  - The `expected_salary` column on the `candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "expected_salary",
ADD COLUMN     "expected_salary" INTEGER;
