/*
  Warnings:

  - Added the required column `expires_at` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "expires_at" TIMESTAMP NOT NULL;
