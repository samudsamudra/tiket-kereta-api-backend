import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user/user.entity';
import { Pelanggan } from '../pelanggan/entities/pelanggan/pelanggan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pelanggan]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // Pastikan ini ditambahkan
})
export class AuthModule {}
