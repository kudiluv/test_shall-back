import { Module } from '@nestjs/common';
import { FormaterService } from './formater.service';

@Module({
  providers: [FormaterService],
  exports: [FormaterService],
})
export class FormaterModule {}
