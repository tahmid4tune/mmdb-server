import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller({ path: 'ratings', version: '1' })
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  updateRating(@Body() ratingDto: RatingDto, @CurrentUser() user: User) {
    return this.ratingsService.updateRating(ratingDto, user);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
