import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {

  @PrimaryGeneratedColumn('uuid') public id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}