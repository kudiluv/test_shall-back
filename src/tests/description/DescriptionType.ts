import { TextDescriptionType } from './TextDescriptionType';
import { ImageDescriptionType } from './ImageDescriptionType';

export class DescriptionType {
  uuid: string;
  type: TypesOfDescription;
  value: ImageDescriptionType | TextDescriptionType;
}

export enum TypesOfDescription {
  image,
  text,
}
