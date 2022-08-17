import { Controller, Post, Body } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller({ path: 'ratings', version: '1' })
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  updateRating(@Body() ratingDto: RatingDto, @CurrentUser() user: User) {
    return this.ratingsService.updateRating(ratingDto, user);
  }
}
