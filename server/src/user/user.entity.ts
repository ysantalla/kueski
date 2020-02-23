import {
  Entity,
  Column,
} from 'typeorm';

import {
  IsString,
  MaxLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';

import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';


@Entity('users')
export class User extends BaseEntity {
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsBoolean({ always: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @IsString({ always: true })
  @Column({ nullable: true })
  firstname: string;

  @IsString({ always: true })
  @Column({ nullable: true })
  lastname: string;

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, })
  @Exclude()
  password: string;
}
