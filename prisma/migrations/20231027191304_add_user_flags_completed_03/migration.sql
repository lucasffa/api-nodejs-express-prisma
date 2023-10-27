/*
  Warnings:

  - You are about to drop the column `activeSince` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `activeSince`,
    ADD COLUMN `lastActivitySince` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
