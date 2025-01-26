import { Controller, Get } from '@nestjs/common';
import { EncryptionService } from '../src/common/encryption.service';

@Controller('test')
export class TestController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Get('encrypt')
  encryptData(): string {
    const data = 'hello world';
    return this.encryptionService.encrypt(data);
  }

  @Get('decrypt')
  decryptData(): string {
    const encryptedData = this.encryptionService.encrypt('hello world');
    return this.encryptionService.decrypt(encryptedData);
  }
}
