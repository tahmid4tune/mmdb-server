import { IsNumber, Max, Min } from 'class-validator';
import ExceptionMessages from '../../common/enums/exceptions.enum';

export class CreateRatingDto {
  @IsNumber()
  movieId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @Max(5, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  @Min(1, { message: ExceptionMessages.MOVIE_RATING_ERROR })
  rating: number;
}
