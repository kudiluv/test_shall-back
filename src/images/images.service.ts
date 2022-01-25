import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
  async save(image: MemoryStoredFile) {
    const fileName = `${nanoid()}${path.extname(image.originalName)}`;
    const filePath = `public/images/${fileName}`;
    await fs.writeFile(filePath, image.buffer);
    return `images/${fileName}`;
  }
}
