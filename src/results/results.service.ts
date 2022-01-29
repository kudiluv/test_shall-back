import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestsService } from 'src/tests/tests.service';
import { CreateResultDto } from './dto/create.result.dto';
import { CountLastSeven, StatisticDto } from './dto/statistic.dto';
import { Result, ResultDocument } from './results.schema';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result.name) private testModel: Model<ResultDocument>,
    private testsService: TestsService,
  ) {}
  async save(createResultDto: CreateResultDto) {
    const createdResult = new this.testModel({
      createdAt: new Date(),
      ...createResultDto,
    });
    return await createdResult.save();
  }

  async getStatistics(testId: string): Promise<StatisticDto> {
    const test = await this.testsService.findById(testId);
    const resultIds = test.results.items.map((item) => item.id);
    return {
      name: test.name,
      resultDescriptions: test.results.items,
      countAll: await this.getStatistcsAllCount(testId, resultIds),
      countLastSeven: await this.getStatistcsAllCountSeven(testId, resultIds),
      resultsStatistic: await Promise.all(
        resultIds.map(async (resultId) => ({
          resultId,
          count: await this.getStatisticsByResultId(resultId),
        })),
      ),
    };
  }

  async getStatistcsAllCount(testId: string, resultId: string[]) {
    return await this.testModel.countDocuments({
      testId,
      $or: resultId.map((resultId) => ({
        resultId,
      })),
    });
  }

  async getStatistcsAllCountSeven(testId: string, resultId: string[]) {
    const dateNow = Date.now();
    const data = await this.testModel.aggregate([
      {
        $match: {
          testId: testId,
          createdAt: { $gte: new Date(dateNow - 7 * 24 * 60 * 60 * 1000) },
          $or: resultId.map((resultId) => ({
            resultId,
          })),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          createdAt: { $first: '$createdAt' },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $project: {
          count: 1,
          createdAt: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          _id: 0,
        },
      },
    ]);
    return this.filleEmptyValues(dateNow, data);
  }

  private filleEmptyValues(dateNow: number, data: CountLastSeven[]) {
    for (let i = 0; i < 7; i++) {
      const date = new Date(dateNow - i * 24 * 60 * 60 * 1000);
      const checkedDate = date.toISOString().slice(0, 10);
      const index = data.findIndex((item) => {
        return item.createdAt === checkedDate;
      });
      if (index === -1) {
        data.push({
          count: 0,
          createdAt: checkedDate,
        });
      }
    }
    data.sort((a, b) => {
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });
    return data;
  }

  async getStatisticsByResultId(resultId: string) {
    return await this.testModel.countDocuments({
      resultId,
    });
  }
}
