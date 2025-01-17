/*
  Warnings:

  - The values [Incompleto] on the enum `StatusProject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusProject_new" AS ENUM ('Ativo', 'Pendente', 'Completo');
ALTER TABLE "Project" ALTER COLUMN "status_project" TYPE "StatusProject_new" USING ("status_project"::text::"StatusProject_new");
ALTER TYPE "StatusProject" RENAME TO "StatusProject_old";
ALTER TYPE "StatusProject_new" RENAME TO "StatusProject";
DROP TYPE "StatusProject_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deleted_at" TIMESTAMP(3);
