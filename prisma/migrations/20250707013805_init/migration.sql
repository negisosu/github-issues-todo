/*
  Warnings:

  - Added the required column `userId` to the `TodoIssue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `TodoIssue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TodoIssue" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "githubId" TEXT NOT NULL,
    "githubName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("githubName","githubId")
);

-- AddForeignKey
ALTER TABLE "TodoIssue" ADD CONSTRAINT "TodoIssue_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User"("githubId", "githubName") ON DELETE RESTRICT ON UPDATE CASCADE;
