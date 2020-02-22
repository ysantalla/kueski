import {
  Entity,
  Column,
} from 'typeorm';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Type, Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';


export class Name {
  @IsString({ always: true })
  @Column({ nullable: true })
  first: string;

  @IsString({ always: true })
  @Column({ nullable: true })
  last: string;
}

@Entity('users')
export class User extends BaseEntity {
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsBoolean({ always: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Type((t) => Name)
  @Column((type) => Name)
  name: Name;

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, })
  // @Exclude()
  password: string;

}
