-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","userName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_repoName_userName_key" ON "Favorite"("repoName", "userName");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User"("githubId", "githubName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_repoName_userName_fkey" FOREIGN KEY ("repoName", "userName") REFERENCES "TodoIssue"("repo", "owner") ON DELETE RESTRICT ON UPDATE CASCADE;
