/*
  Warnings:

  - You are about to alter the column `current_salary` on the `candidate` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_experience` on the `candidate` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `notice_period` on the `candidate` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "candidate" ALTER COLUMN "current_salary" SET DATA TYPE INTEGER,
ALTER COLUMN "total_experience" SET DATA TYPE INTEGER,
ALTER COLUMN "notice_period" SET DATA TYPE INTEGER;
