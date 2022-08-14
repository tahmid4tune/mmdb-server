import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import ExceptionMessages from '../../common/enums/exceptions.enum';

export class CreateMovieDto {
  @ApiProperty({ description: 'Name of the movie' })
  @MaxLength(40, { message: ExceptionMessages.MOVIE_NAME_LENGTH_ERROR })
  readonly name: string;

  @ApiProperty({ description: 'Release year' })
  @Max(new Date().getFullYear(), {
    message: ExceptionMessages.MOVIE_YEAR_MAX_ERROR,
  })
  @Min(1895, {
    message: ExceptionMessages.MOVIE_YEAR_MIN_ERROR,
  })
  readonly releaseYear: number;

  @ApiProperty({ description: 'Story in short' })
  @MaxLength(500, { message: ExceptionMessages.MOVIE_INTRO_LENGTH_ERROR })
  @MinLength(20, { message: ExceptionMessages.MOVIE_INTRO_LENGTH_ERROR })
  readonly intro: string;

  @ApiProperty({
    description: 'Movie initial rating given by the person who added it',
  })
  @IsOptional()
  @Max(5, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  @Min(1, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  readonly rating: number;
}
