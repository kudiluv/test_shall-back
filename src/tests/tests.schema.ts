import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

class results {
  total: number;
  items: any[];
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
  results: results;
}

export const TestSchema = SchemaFactory.createForClass(Test);
