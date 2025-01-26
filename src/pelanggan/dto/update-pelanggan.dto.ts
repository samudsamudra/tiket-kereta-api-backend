import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePelangganDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nama?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  alamat?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telp?: string;
}
