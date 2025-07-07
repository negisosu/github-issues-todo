-- CreateTable
CREATE TABLE "User" (
    "githubId" TEXT NOT NULL,
    "githubName" TEXT NOT NULL,
    "githubEmail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "IssuesTodo" (
    "issuesId" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IssuesTodo_pkey" PRIMARY KEY ("issuesId")
);

-- AddForeignKey
ALTER TABLE "IssuesTodo" ADD CONSTRAINT "IssuesTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
