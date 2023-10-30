/*
  Warnings:

  - You are about to drop the `Todolist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Userdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todolist" DROP CONSTRAINT "Todolist_postUsername_fkey";

-- DropTable
DROP TABLE "Todolist";

-- DropTable
DROP TABLE "Userdata";

-- CreateTable
CREATE TABLE "userdata" (
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "firstname" VARCHAR(30),
    "lastname" VARCHAR(30),
    "telephone" VARCHAR(20),
    "createdAt" TIMESTAMP,

    CONSTRAINT "userdata_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "userdata_email_key" ON "userdata"("email");
