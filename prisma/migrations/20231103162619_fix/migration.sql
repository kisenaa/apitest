/*
  Warnings:

  - You are about to drop the column `postUsername` on the `todolist` table. All the data in the column will be lost.
  - The primary key for the `userdata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `userdata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `todolist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `userdata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "todolist" DROP CONSTRAINT "todolist_postUsername_fkey";

-- AlterTable
ALTER TABLE "todolist" DROP COLUMN "postUsername",
ADD COLUMN     "userId" CHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE "userdata" DROP CONSTRAINT "userdata_pkey",
ADD COLUMN     "userId" CHAR(32) NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(32),
ADD CONSTRAINT "userdata_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userdata_username_key" ON "userdata"("username");

-- AddForeignKey
ALTER TABLE "todolist" ADD CONSTRAINT "todolist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userdata"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
