import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  readonly perPage: number = 10;

  @IsOptional()
  readonly page: number = 1;
}
