-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderdById_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderdById_fkey" FOREIGN KEY ("orderdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
