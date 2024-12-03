-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('READ', 'WRITE', 'ADMIN', 'OWNER');

-- CreateTable
CREATE TABLE "UserType" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Permission" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "permission_type" "PermissionType" NOT NULL,
    "granted_by" TEXT NOT NULL,
    "grantedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserMain"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserMain"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
