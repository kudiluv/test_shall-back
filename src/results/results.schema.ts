import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResultDocument = Result & Document;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
    },
  },
})
export class Result {
  @Prop()
  testId: string;

  @Prop()
  resultId: string;

  @Prop()
  createdAt: Date;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
