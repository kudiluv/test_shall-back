import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { User } from 'src/users/users.decorator';
import { CreateTestDto } from './dto/create.test.dto';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Auth()
  @Get()
  getUsersTests(@User() user) {
    return this.testsService.findAll(user.id);
  }

  @Get('/:id')
  getTest(@Param('id') id: string) {
    return this.testsService.findById(id);
  }

  @Auth()
  @Post()
  createTest(@Body() createTestDto: CreateTestDto, @User() user) {
    return this.testsService.create(createTestDto, user.id);
  }

  @Auth()
  @Put()
  updateTest(@Body() createTestDto: CreateTestDto, @User() user) {
    return this.testsService.update(createTestDto, user.id);
  }

  @Auth()
  @Delete('/:id')
  deleteTest(@Param('id') id: string, @User() user) {
    return this.testsService.delete(id, user.id);
  }
}
