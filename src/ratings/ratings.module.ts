import { forwardRef, Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { MoviesService } from '../movies/movies.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    forwardRef(() => MoviesModule),
    TypeOrmModule.forFeature([Rating, Movie]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService, MoviesService],
  exports: [RatingsService],
})
export class RatingsModule {}
