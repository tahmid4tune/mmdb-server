import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  LessThanOrEqual,
  MoreThanOrEqual,
  FindOptionsOrderValue,
  FindOptionsOrder,
  Between,
} from 'typeorm';
import { PaginatedSearchResponseDto } from '../common/dto/Search-response.dto';
import ExceptionMessages from '../common/enums/exceptions.enum';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsService } from '../ratings/ratings.service';
import { User } from '../users/entities/user.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMoviesDto } from './dto/search-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private ratingService: RatingsService,
  ) {}
  async create(createMovieDto: CreateMovieDto, user: User) {
    const movie = this.moviesRepository.create(createMovieDto);
    movie.addedBy = user;
    const movieEntity = await this.moviesRepository.save(movie);
    let rating: Rating = null;
    if (createMovieDto.rating) {
      rating = await this.ratingService.recordRating({
        movieId: movieEntity.id,
        userId: user.id,
        rating: createMovieDto.rating,
      });
      movieEntity.averageRating = rating.rating;
      return await this.moviesRepository.save(movieEntity);
    }
    return movieEntity;
  }

  async search(
    searchMovieDto: SearchMoviesDto,
  ): Promise<PaginatedSearchResponseDto> {
    if (searchMovieDto?.minRating > searchMovieDto?.maxRating) {
      throw new BadRequestException(ExceptionMessages.MOVIE_MAX_MIN_ERROR);
    }
    const [resultForThisPage, total]: [Movie[], number] =
      await this.moviesRepository.findAndCount({
        where: {
          ...(searchMovieDto.name && {
            name: Like(`%${searchMovieDto.name}%`),
          }),
          ...(searchMovieDto.releaseYear && {
            releaseYear: searchMovieDto.releaseYear,
          }),
          ...(searchMovieDto.minRating &&
            !searchMovieDto.maxRating && {
              averageRating: MoreThanOrEqual(searchMovieDto.minRating),
            }),
          ...(searchMovieDto.maxRating &&
            !searchMovieDto.minRating && {
              averageRating: LessThanOrEqual(searchMovieDto.maxRating),
            }),
          ...(searchMovieDto.maxRating &&
            searchMovieDto.minRating && {
              averageRating: Between(
                searchMovieDto.minRating,
                searchMovieDto.maxRating,
              ),
            }),
        },
        order: this.getSortCriteria(
          searchMovieDto.sortByProperty,
          searchMovieDto.order as FindOptionsOrderValue,
        ),
        skip: (searchMovieDto.page - 1) * searchMovieDto.perPage,
        take: searchMovieDto.perPage,
      });
    return {
      resultForThisPage,
      total,
    };
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, user: User) {
    const movie = await this.findMovieById(id, ['addedBy']);
    this.checkMovieModificationAccess(movie, user);
    return await this.moviesRepository.save({ ...movie, ...updateMovieDto });
  }

  async remove(id: number, user: User) {
    this.checkMovieModificationAccess(
      await this.findMovieById(id, ['addedBy']),
      user,
    );
    await this.moviesRepository.softDelete(id);
  }

  async updateAverageRating(
    id: number,
    userGivenRating: number,
    totalRatings: number,
    previousRating: number = null,
  ) {
    const movie = await this.findMovieById(id);
    if (previousRating) {
      // user updates own rating for same movie
      movie.averageRating =
        (movie.averageRating * totalRatings -
          previousRating +
          userGivenRating) /
        totalRatings;
    } else {
      // user adds rating for new movie
      movie.averageRating =
        (movie.averageRating * (totalRatings - 1) + userGivenRating) /
        totalRatings;
    }
    return await this.moviesRepository.save(movie);
  }

  async findMovieById(id: number, relations: string[] = null) {
    return await this.moviesRepository.findOne({
      where: { id },
      ...(relations && { relations }),
    });
  }

  checkMovieModificationAccess(movie: Movie, user: User) {
    if (!movie) {
      throw new BadRequestException(ExceptionMessages.MOVIE_NOT_FOUND);
    }
    if (user?.id !== movie.addedBy?.id) {
      throw new BadRequestException(
        ExceptionMessages.MOVIE_UPDATE_NOT_AUTHORIZED,
      );
    }
  }

  getSortCriteria(
    property = 'name',
    order: FindOptionsOrderValue = 'ASC',
  ): FindOptionsOrder<Movie> {
    switch (property) {
      case 'name':
        return { name: order };
      case 'releaseYear':
        return { releaseYear: order };
      case 'averageRating':
        return { averageRating: order };
      default:
        return { name: order };
    }
  }
}
