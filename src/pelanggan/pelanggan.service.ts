import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelanggan } from './entities/pelanggan/pelanggan.entity';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto'; // Ensure this file exists

@Injectable()
export class PelangganService {
  constructor(
    @InjectRepository(Pelanggan)
    private readonly pelangganRepository: Repository<Pelanggan>,
  ) {}

  async getProfile(userId: number) {
    const pelanggan = await this.pelangganRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // Relasi ke tabel user
    });

    if (!pelanggan) {
      throw new NotFoundException('Profile not found');
    }

    return {
      nik: pelanggan.nik,
      nama: pelanggan.nama_penumpang,
      alamat: pelanggan.alamat,
      telp: pelanggan.telp,
      email: pelanggan.user ? pelanggan.user.email : null,
    };
  }

  async updateProfile(userId: number, updatePelangganDto: UpdatePelangganDto) {
    const pelanggan = await this.pelangganRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!pelanggan) {
      throw new NotFoundException('Profil tidak ditemukan');
    }

    // Perbarui data pelanggan
    Object.assign(pelanggan, updatePelangganDto);
    await this.pelangganRepository.save(pelanggan);

    return { message: 'Profil berhasil diperbarui' };
  }
}
