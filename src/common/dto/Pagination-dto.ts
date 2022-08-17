import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  readonly perPage: number;

  @IsNumber()
  readonly page: number;
}
