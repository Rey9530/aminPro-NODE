/*
  Warnings:

  - A unique constraint covering the columns `[foto]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `foto` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_foto_key` ON `usuarios`(`foto`);
