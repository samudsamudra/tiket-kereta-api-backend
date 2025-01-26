import { Controller, Get, Patch, Body, Req, Request, UseGuards } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.sub; // Ambil userId dari JWT
    return this.pelangganService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: any, @Body() updatePelangganDto: UpdatePelangganDto) {
    const userId = req.user.id;
    return this.pelangganService.updateProfile(userId, updatePelangganDto);
  }
}
