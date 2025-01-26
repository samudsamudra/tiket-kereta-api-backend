import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Pastikan JWT Service di-import
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Pelanggan } from '../pelanggan/entities/pelanggan.entity';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pelanggan)
    private readonly pelangganRepository: Repository<Pelanggan>,
    private readonly jwtService: JwtService, // Tambahkan ini
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

  // Fungsi login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Cari user berdasarkan email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Email atau password salah');
    }

    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Email atau password salah');
    }

    // Buat payload JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil',
      token,
    };
  }
}
