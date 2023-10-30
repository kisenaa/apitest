/*
  Warnings:

  - Added the required column `status` to the `Todolist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todolist" ADD COLUMN     "status" BOOLEAN NOT NULL;
