import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { PaginationDto } from '../../common/dto/Pagination-dto';
import ExceptionMessages from '../../common/enums/exceptions.enum';

export class SearchMoviesDto extends PaginationDto {
  @ApiProperty({ description: 'Name of the movie' })
  @MaxLength(40, { message: ExceptionMessages.MOVIE_NAME_LENGTH_ERROR })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ description: 'Release year' })
  @IsNumber()
  @Max(new Date().getFullYear(), {
    message: ExceptionMessages.MOVIE_YEAR_MAX_ERROR,
  })
  @Min(1895, {
    message: ExceptionMessages.MOVIE_YEAR_MIN_ERROR,
  })
  @IsOptional()
  readonly releaseYear: number;

  @ApiProperty({ description: 'Max movie rating for search' })
  @IsOptional()
  @IsNumber()
  @Max(5, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  @Min(1, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  readonly maxRating: number;

  @ApiProperty({ description: 'Min movie rating for search' })
  @IsOptional()
  @IsNumber()
  @Max(5, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  @Min(1, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  readonly minRating: number;

  @IsOptional()
  readonly sortByProperty: string;

  @IsOptional()
  readonly order: string;
}
