import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateImageDto {
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}
