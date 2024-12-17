/*
  Warnings:

  - Added the required column `name` to the `CourseRound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseRound" ADD COLUMN     "cache" JSONB,
ADD COLUMN     "name" TEXT NOT NULL;
