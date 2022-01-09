export class CreateTestDto {
  name: string;
  questions: any[];
  type: string;
  results: { total: number; items: any[] };
}
