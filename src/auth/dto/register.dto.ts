import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  nik!: string; // Special for customers

  @IsNotEmpty()
  @IsString()
  nama!: string; // Customer or staff name

  @IsNotEmpty()
  @IsString()
  alamat!: string; // Customer or staff address

  @IsNotEmpty()
  @IsString()
  telp!: string; // Customer or staff phone number
}
