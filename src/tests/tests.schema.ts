import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DescriptionType } from './description/DescriptionType';

export type TestDocument = Test & Document;

class Results {
  ranges: number[];
  items: { id: string; description: DescriptionType[] }[];
}

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
    },
  },
})
export class Test {
  @Prop({ type: String, unique: true, index: true })
  id: string;

  @Prop()
  userId: number;

  @Prop()
  name: string;

  @Prop()
  questions: any[];

  @Prop()
  results: Results;
}

export const TestSchema = SchemaFactory.createForClass(Test);
