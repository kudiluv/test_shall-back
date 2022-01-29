import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormaterModule } from 'src/formater/formater.module';
import { TestsModule } from 'src/tests/tests.module';
import { ViewsModule } from 'src/views/views.module';
import { ResultsController } from './results.controller';
import { Result, ResultSchema } from './results.schema';
import { ResultsService } from './results.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    TestsModule,
    ViewsModule.config({ path: '/app/templates/' }),
    FormaterModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
