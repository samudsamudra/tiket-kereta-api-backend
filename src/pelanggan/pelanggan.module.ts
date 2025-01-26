import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelanggan } from './entities/pelanggan/pelanggan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelanggan])],
  exports: [TypeOrmModule],
})
export class PelangganModule {}
