/*
  Warnings:

  - You are about to drop the column `auth_id` on the `UserMain` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserMain_auth_id_key";

-- AlterTable
ALTER TABLE "UserMain" DROP COLUMN "auth_id";
