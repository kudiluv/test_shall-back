import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('upload/images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}
  @ApiOperation({ summary: 'saving image' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @FormDataRequest()
  createLot(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.save(createImageDto.image);
  }
}
