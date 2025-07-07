/*
  Warnings:

  - You are about to drop the column `userId` on the `TodoIssue` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `TodoIssue` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoIssue" DROP CONSTRAINT "TodoIssue_userId_userName_fkey";

-- AlterTable
ALTER TABLE "TodoIssue" DROP COLUMN "userId",
DROP COLUMN "userName";

-- DropTable
DROP TABLE "User";
