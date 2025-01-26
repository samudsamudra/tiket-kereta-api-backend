import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule
import { Pelanggan } from './entities/pelanggan.entity';
import { PelangganController } from './pelanggan.controller';
import { PelangganService } from './pelanggan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pelanggan]),
    AuthModule, // Tambahkan di sini
  ],
  controllers: [PelangganController],
  providers: [PelangganService],
})
export class PelangganModule {}
