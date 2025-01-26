import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Pelanggan } from '../pelanggan/entities/pelanggan/pelanggan.entity';
import { User } from '../users/entities/user/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pelanggan)
    private readonly pelangganRepository: Repository<Pelanggan>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, email, nik, nama, alamat, telp } = registerDto;

    // Validasi email untuk role petugas
    const isPetugasEmail =
      email.endsWith('@petugas-KAI.com') || email.endsWith('@staff-KAI.com');
    if (!isPetugasEmail && email.includes('@petugas')) {
      throw new BadRequestException(
        'Email dengan domain @petugas-KAI.com atau @staff-KAI.com hanya diperbolehkan untuk role petugas',
      );
    }

    // Tentukan role berdasarkan validasi email
    const role = isPetugasEmail ? 'petugas' : 'penumpang';

    // Cek apakah user sudah terdaftar
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Jika role penumpang, cek apakah NIK sudah ada
    if (role === 'penumpang') {
      const existingPelanggan = await this.pelangganRepository.findOne({
        where: { nik },
      });
      if (existingPelanggan) {
        throw new BadRequestException('NIK sudah terdaftar');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    // Jika pelanggan, simpan data tambahan
    if (role === 'penumpang') {
      const pelanggan = this.pelangganRepository.create({
        nik,
        nama_penumpang: nama,
        alamat,
        telp,
        user: savedUser, // Hubungkan dengan user yang baru saja disimpan
      });

      await this.pelangganRepository.save(pelanggan);
    }

    return { message: 'Registrasi berhasil', role };
  }
}
