-- CreateTable
CREATE TABLE "todolist" (
    "postId" CHAR(13) NOT NULL,
    "postUsername" VARCHAR(30) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "todolist_pkey" PRIMARY KEY ("postId")
);

-- AddForeignKey
ALTER TABLE "todolist" ADD CONSTRAINT "todolist_postUsername_fkey" FOREIGN KEY ("postUsername") REFERENCES "userdata"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
