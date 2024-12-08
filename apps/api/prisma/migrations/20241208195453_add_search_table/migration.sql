-- CreateTable
CREATE TABLE "UserSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "search" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSearch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSearch" ADD CONSTRAINT "UserSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
