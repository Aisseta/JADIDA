-- DropIndex
DROP INDEX "User_address_key";

-- CreateTable
CREATE TABLE "Clothing" (
    "id_clothing" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "main_image_url" TEXT NOT NULL,
    "secondary_image_url" TEXT,
    "third_image_url" TEXT,
    "value_jadis" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id_clothing")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id_transaction" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "clothing_id" INTEGER NOT NULL,
    "amount_jadis" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id_transaction")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id_exchange" SERIAL NOT NULL,
    "clothing_received_id" INTEGER NOT NULL,
    "clothing_exchanged_id" INTEGER NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "exchange_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id_exchange")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id_evaluation" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id_evaluation")
);

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clothing_id_fkey" FOREIGN KEY ("clothing_id") REFERENCES "Clothing"("id_clothing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_clothing_received_id_fkey" FOREIGN KEY ("clothing_received_id") REFERENCES "Clothing"("id_clothing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_clothing_exchanged_id_fkey" FOREIGN KEY ("clothing_exchanged_id") REFERENCES "Clothing"("id_clothing") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id_transaction") ON DELETE RESTRICT ON UPDATE CASCADE;
