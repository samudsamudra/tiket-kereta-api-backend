import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule], // Pastikan TypeOrmModule diekspor agar dapat digunakan di luar modul ini
})
export class UsersModule {}
