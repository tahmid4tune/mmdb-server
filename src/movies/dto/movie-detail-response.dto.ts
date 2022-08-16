import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AddedByUser {
  @Expose()
  name: string;
}

@Exclude()
export class MovieDetailResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  intro: string;

  @Expose()
  releaseYear: number;

  @Expose()
  averageRating: number;

  @Expose()
  addedBy: AddedByUser;

  @Expose()
  editOption: boolean;

  @Expose()
  deleteOption: boolean;

  @Expose()
  ratingByUser: number;
}
