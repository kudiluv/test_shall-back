import { Module } from '@nestjs/common';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
