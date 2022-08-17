import { Movie } from '../../movies/entities/movie.entity';

export class PaginatedSearchResponseDto {
  total: number;
  resultForThisPage: Movie[];
}
