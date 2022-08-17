import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    length: 500,
  })
  intro: string;

  @Column({
    nullable: false,
  })
  releaseYear: number;

  @Column({ default: 0 })
  averageRating: number;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.movie)
  @JoinTable()
  addedBy: User;
}
