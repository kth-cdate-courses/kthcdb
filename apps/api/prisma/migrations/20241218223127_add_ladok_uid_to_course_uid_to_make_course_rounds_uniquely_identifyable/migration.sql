/*
  Warnings:

  - A unique constraint covering the columns `[courseId,term,ladokUId]` on the table `CourseRound` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ladokUId` to the `CourseRound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseRound" ADD COLUMN     "ladokUId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseRound_courseId_term_ladokUId_key" ON "CourseRound"("courseId", "term", "ladokUId");
