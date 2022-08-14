import { PartialType } from '@nestjs/swagger';
import { RatingDto } from './rating.dto';

export class UpdateRatingDto extends PartialType(RatingDto) {}
