import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { User } from '../users/entities/user.entity';
import { RatingDto } from './dto/rating.dto';
import { UpdateRatingResponseDto } from './dto/update-rating-response.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
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
    const movieRating = await this.ratingRepository.findOne({
      where: { movieId: ratingDto.movieId, userId: user.id },
    });
    let totalRatings = 0;
    let previousRating: number = null;
    if (!movieRating) {
      await this.recordRating(ratingDto);
      totalRatings = 1;
    } else {
      previousRating = movieRating.rating;
      movieRating.rating = ratingDto.rating;
      await this.ratingRepository.save(movieRating);
      totalRatings = await this.ratingRepository.count({
        where: { movieId: ratingDto.movieId },
      });
    }

    const movie = await this.movieService.updateAverageRating(
      ratingDto.movieId,
      ratingDto.rating,
      totalRatings,
      previousRating,
    );
    return {
      userRating: ratingDto.rating,
      averageRating: movie.averageRating,
      movieId: movie.id,
    };
  }

  findAll() {
    return `This action returns all ratings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
