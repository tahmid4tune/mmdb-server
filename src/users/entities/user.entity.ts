import { Exclude } from 'class-transformer';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
    primary: true,
  })
  email: string;

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
}
