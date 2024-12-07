/*
  Warnings:

  - Added the required column `username` to the `UserMain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMain" ADD COLUMN     "username" VARCHAR(255) NOT NULL;
