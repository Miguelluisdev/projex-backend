-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accept', 'Pending', 'Refused');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TASK_ASSIGNED', 'TASK_COMPLETED', 'PROJECT_CREATED', 'PROJECT_UPDATED', 'USER_INVITED', 'COMMENT_ADDED', 'DEADLINE_APPROACH', 'STATUS_CHANGED', 'GENERAL');

-- CreateTable
CREATE TABLE "UserMain" (
    "uuid" TEXT NOT NULL,
    "auth_id" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "role" "Role" NOT NULL,

    CONSTRAINT "UserMain_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Project" (
    "uuid" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "type_project" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "uuid" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "assigned_to" TEXT,
    "status" "Status" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Notification" (
    "uuid" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT,
    "project_id" TEXT,
    "task_id" TEXT,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMain_auth_id_key" ON "UserMain"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "UserMain"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "UserMain"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserMain"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
