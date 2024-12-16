/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "cache" JSONB;
