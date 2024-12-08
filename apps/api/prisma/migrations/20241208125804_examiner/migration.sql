/*
  Warnings:

  - A unique constraint covering the columns `[kthId]` on the table `Examiner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `CourseRound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kthId` to the `Examiner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseRound" DROP CONSTRAINT "CourseRound_examinerId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseRound" ADD COLUMN     "term" TEXT NOT NULL,
ALTER COLUMN "examinerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Examiner" ADD COLUMN     "kthId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Examiner_kthId_key" ON "Examiner"("kthId");

-- AddForeignKey
ALTER TABLE "CourseRound" ADD CONSTRAINT "CourseRound_examinerId_fkey" FOREIGN KEY ("examinerId") REFERENCES "Examiner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
