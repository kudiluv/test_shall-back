import { IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  testId: string;
  @IsString()
  resultId: string;
}
