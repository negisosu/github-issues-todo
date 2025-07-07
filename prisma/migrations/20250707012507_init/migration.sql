/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `githubEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `IssuesTodo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IssuesTodo" DROP CONSTRAINT "IssuesTodo_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "githubEmail",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("githubName", "githubId");

-- DropTable
DROP TABLE "IssuesTodo";

-- CreateTable
CREATE TABLE "TodoIssue" (
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "issuesNumber" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TodoIssue_pkey" PRIMARY KEY ("owner","repo","issuesNumber")
);

-- AddForeignKey
ALTER TABLE "TodoIssue" ADD CONSTRAINT "TodoIssue_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User"("githubId", "githubName") ON DELETE RESTRICT ON UPDATE CASCADE;
