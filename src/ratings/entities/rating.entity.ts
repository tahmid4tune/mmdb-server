import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('movie_user_ratings')
export class Rating extends BaseEntity {
  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  rating: number;
}
