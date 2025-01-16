/*
  Warnings:

  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_project` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusProject" AS ENUM ('Ativo', 'Pendente', 'Incompleto', 'Completo');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" VARCHAR(100) NOT NULL,
ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "status_project" "StatusProject" NOT NULL;
