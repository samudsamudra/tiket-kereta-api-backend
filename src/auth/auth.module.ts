import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user/user.entity';
import { Pelanggan } from '../pelanggan/entities/pelanggan/pelanggan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pelanggan])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
