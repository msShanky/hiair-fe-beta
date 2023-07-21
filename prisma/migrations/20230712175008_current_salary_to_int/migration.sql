/*
  Warnings:

  - Added the required column `current_salary` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "current_salary",
ADD COLUMN     "current_salary" INTEGER NOT NULL;
