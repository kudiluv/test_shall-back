import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestDto } from './dto/create.test.dto';
import { Test, TestDocument } from './tests.schema';
import { uuid } from 'uuidv4';

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {}

  async create(createTestDto: CreateTestDto, userId): Promise<Test> {
    const createdTest = new this.testModel({
      ...createTestDto,
      userId,
      id: uuid(),
    });
    return await createdTest.save();
  }

  async findAll(userId) {
    return await this.testModel.find({ userId }).select({ name: 1, id: 1 });
  }

  async update(createTestDto: CreateTestDto, userId: number) {
    const test = await this.findById(createTestDto.id);
    this.isBelongsToUser(test, userId);
    await this.testModel.updateOne({ id: createTestDto.id }, createTestDto);
    return {
      id: test.id,
    };
  }

  async delete(id: string, userId: number) {
    const test = await this.findById(id);
    await this.isBelongsToUser(test, userId);
    await this.testModel.deleteOne({ id });
    return HttpStatus.NO_CONTENT;
  }

  async findById(testId: string) {
    if (!testId) {
      throw new HttpException('Тест не найден', HttpStatus.NOT_FOUND);
    }
    const test = await this.testModel.findOne({
      id: testId,
    });
    if (test) {
      return test;
    }
    throw new HttpException('Тест не найден', HttpStatus.NOT_FOUND);
  }
  private isBelongsToUser(test: TestDocument, userId: number) {
    if (test.userId === userId) {
      return true;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
