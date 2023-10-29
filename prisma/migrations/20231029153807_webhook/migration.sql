-- CreateTable
CREATE TABLE "Userdata" (
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "firstname" VARCHAR(30),
    "lastname" VARCHAR(30),
    "telephone" VARCHAR(20),
    "createdAt" TIMESTAMPTZ,

    CONSTRAINT "Userdata_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Todolist" (
    "postId" CHAR(13) NOT NULL,
    "postUsername" VARCHAR(30) NOT NULL,

    CONSTRAINT "Todolist_pkey" PRIMARY KEY ("postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Userdata_email_key" ON "Userdata"("email");

-- AddForeignKey
ALTER TABLE "Todolist" ADD CONSTRAINT "Todolist_postUsername_fkey" FOREIGN KEY ("postUsername") REFERENCES "Userdata"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
