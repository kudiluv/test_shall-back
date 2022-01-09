import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

class results {
  total: number;
  items: any[];
}

@Schema()
export class Test {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  questions: any[];

  @Prop()
  results: results;
}

export const TestSchema = SchemaFactory.createForClass(Test);
