import { DescriptionType } from 'src/tests/description/DescriptionType';

export class StatisticDto {
  readonly name: string;
  readonly resultDescriptions: { id: string; description: DescriptionType[] }[];
  readonly countAll: number;
  readonly countLastSeven: CountLastSeven[];
  readonly resultsStatistic: ResultStatistic[];
}

export class CountLastSeven {
  createdAt: string;
  count: number;
}

export class ResultStatistic {
  resultId: string;
  count: number;
}
