/*
  Warnings:

  - You are about to drop the column `userName` on the `TodoIssue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoIssue" DROP CONSTRAINT "TodoIssue_userId_userName_fkey";

-- AlterTable
ALTER TABLE "TodoIssue" DROP COLUMN "userName";

-- AddForeignKey
ALTER TABLE "TodoIssue" ADD CONSTRAINT "TodoIssue_userId_owner_fkey" FOREIGN KEY ("userId", "owner") REFERENCES "User"("githubId", "githubName") ON DELETE RESTRICT ON UPDATE CASCADE;
