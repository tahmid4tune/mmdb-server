import { Exclude } from 'class-transformer';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('created_at')
  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  createdAt: Date;

  @Column('updated_at')
  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
