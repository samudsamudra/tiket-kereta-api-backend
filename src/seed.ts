import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppModule } from './app.module';
import { Pelanggan } from './pelanggan/entities/pelanggan.entity';
import { User } from './users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<Repository<User>>('UserRepository');
  const pelangganRepository = app.get<Repository<Pelanggan>>(
    'PelangganRepository',
  );

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed data untuk admin
  const adminUser = userRepository.create({
    username: 'admin1',
    email: 'admin@petugas-KAI.com',
    password: hashedPassword,
    role: 'admin', // Pastikan sesuai dengan enum
  });

  // Seed data untuk pelanggan
  const pelangganData = {
    nik: '1234567890123456',
    nama_penumpang: 'John Doe',
    alamat: 'Jl. Contoh No.1',
    telp: '081234567890',
  };

  const pelangganUser = userRepository.create({
    username: 'penumpang1',
    email: 'user@example.com',
    password: hashedPassword,
    role: 'penumpang', // Pastikan sesuai dengan enum
  });

  // Simpan admin
  const adminExists = await userRepository.findOne({
    where: { email: adminUser.email },
  });
  if (!adminExists) {
    await userRepository.save(adminUser);
  }

  // Simpan pelanggan
  const pelangganExists = await userRepository.findOne({
    where: { email: pelangganUser.email },
  });
  if (!pelangganExists) {
    const savedUser = await userRepository.save(pelangganUser); // Simpan user pelanggan
    const savedPelanggan = pelangganRepository.create({
      ...pelangganData,
      user: savedUser, // Relasi ke user pelanggan
    });
    await pelangganRepository.save(savedPelanggan);
  }

  console.log('Seed data berhasil dimasukkan');
  process.exit();
}

bootstrap();
