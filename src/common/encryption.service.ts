import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor(private readonly configService: ConfigService) {
    const appKey = this.configService.get<string>('APP_KEY');
    if (!appKey) {
      throw new Error('APP_KEY harus diatur dalam file .env');
    }

    // Hash APP_KEY menjadi buffer 32 karakter
    this.key = crypto.createHash('sha256').update(appKey).digest();
    this.iv = crypto.randomBytes(16); // IV tetap 16 byte
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`; // Gabungkan IV dengan data terenkripsi
  }

  decrypt(data: string): string {
    const [iv, encryptedData] = data.split(':');
    if (!iv || !encryptedData) {
      throw new Error('Format data terenkripsi tidak valid');
    }

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.key,
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
