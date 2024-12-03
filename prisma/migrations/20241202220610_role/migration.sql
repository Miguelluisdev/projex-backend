/*
  Warnings:

  - You are about to drop the column `role` on the `UserMain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMain" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
