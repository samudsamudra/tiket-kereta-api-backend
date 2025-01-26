import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PelangganModule } from './pelanggan/pelanggan.module';
import { PetugasModule } from './petugas/petugas.module';
import { KeretaModule } from './kereta/kereta.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { PembelianModule } from './pembelian/pembelian.module';
import { EncryptionService } from './common/encryption.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Harus diatur ke true agar dapat digunakan di seluruh aplikasi
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    PelangganModule,
    PetugasModule,
    KeretaModule,
    JadwalModule,
    PembelianModule,
  ],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class AppModule {}
