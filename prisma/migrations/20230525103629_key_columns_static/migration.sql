/*
  Warnings:

  - Added the required column `key` to the `job_pool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `service_domain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_pool" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_domain" ADD COLUMN     "key" TEXT NOT NULL;
