import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { User } from '../users/entities/user.entity';
import { RatingDto } from './dto/rating.dto';
import { UpdateRatingResponseDto } from './dto/update-rating-response.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @Inject(forwardRef(() => MoviesService))
    private movieService: MoviesService,
  ) {}

  async recordRating(ratingDto: RatingDto) {
    return await this.ratingRepository.save(ratingDto);
  }

  async updateRating(
    ratingDto: RatingDto,
    user: User,
  ): Promise<UpdateRatingResponseDto> {
    const movieRatingByCurrentUser = await this.findMovieRatingByUser(
      ratingDto.movieId,
      user.id,
    );
    if (!movieRatingByCurrentUser) {
      await this.recordRating(ratingDto);
    } else {
      movieRatingByCurrentUser.rating = ratingDto.rating;
      await this.ratingRepository.save(movieRatingByCurrentUser);
    }
    const movie = await this.movieService.updateAverageRating(
      ratingDto.movieId,
      await this.getAverageMovieRating(ratingDto.movieId),
    );
    return {
      userRating: ratingDto.rating,
      averageRating: movie.averageRating,
      movieId: movie.id,
    };
  }

  async getAverageMovieRating(movieId: number): Promise<number> {
    const avgRating = await this.ratingRepository
      .createQueryBuilder('movie_user_ratings')
      .select('AVG(movie_user_ratings.rating)', 'averageRating')
      .where('movie_user_ratings.movieId = :movieId', { movieId })
      .getRawOne();
    return avgRating.averageRating;
  }

  async findMovieRatingByUser(movieId: number, userId: number) {
    return await this.ratingRepository.findOne({ where: { movieId, userId } });
  }
}
