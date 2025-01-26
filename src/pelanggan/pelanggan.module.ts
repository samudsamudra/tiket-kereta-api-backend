import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelanggan } from './entities/pelanggan/pelanggan.entity';
import { PelangganService } from './pelanggan.service';
import { PelangganController } from './pelanggan.controller';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Pelanggan]),
    AuthModule, // Tambahkan di sini
  ],
  controllers: [PelangganController],
  providers: [PelangganService],
})
export class PelangganModule {}
