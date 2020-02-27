import {
  IsString,
  MaxLength,
} from 'class-validator';

import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';

import { Column, Entity } from 'typeorm';


export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();   
  }

  @IsString({ always: true })
  @Column({ nullable: true })
  @Column() public firstname: string;

  @IsString({ always: true })
  @Column({ nullable: true })
  @Column() public lastname: string;

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Column() public email: string;

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, })
  @Exclude()
  public password: string;

  @Column() public role: Role;

}
