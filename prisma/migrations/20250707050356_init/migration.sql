/*
  Warnings:

  - The primary key for the `TodoIssue` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TodoIssue" DROP CONSTRAINT "TodoIssue_pkey",
ADD CONSTRAINT "TodoIssue_pkey" PRIMARY KEY ("owner", "repo");
