import { IsNotEmpty } from 'class-validator';

export default class RefreshDto {
  @IsNotEmpty()
  readonly refreshToken: string;
}
