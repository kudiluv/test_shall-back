import { Controller, Post } from '@nestjs/common';
import { CreateTestDto } from './dto/create.test.dto';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Post()
  createTest(creatTestDto: CreateTestDto) {
    return this.testsService.create(creatTestDto);
  }
}
