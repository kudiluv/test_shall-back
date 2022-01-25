import { IsString } from 'class-validator';

export class CreateTestDto {
  id?: string;

  @IsString()
  name: string;

  questions: any[];

  results: { total: number; items: any[] };
}
