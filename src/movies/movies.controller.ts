import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { EntityDeletionResponse } from '../common/interfaces/entity-deletion-response';
import { SearchMoviesDto } from './dto/search-movie.dto';

@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('add')
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @CurrentUser() user: User,
  ) {
    return await this.moviesService.create(createMovieDto, user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @CurrentUser() user: User,
  ) {
    return await this.moviesService.update(id, updateMovieDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<EntityDeletionResponse> {
    await this.moviesService.remove(id, user);
    return { message: 'Movie deleted successfully' };
  }

  @Post('search')
  async search(@Body() searchMovieDto: SearchMoviesDto) {
    return await this.moviesService.search(searchMovieDto);
  }
}
