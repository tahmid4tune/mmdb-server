import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Rating]), RatingsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
