import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../common/entity/base.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password?.length) {
      return;
    }
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Movie, (movie) => movie.addedBy)
  movie: Movie[];
}
