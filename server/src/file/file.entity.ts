import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/commons/entity/base.entity';

@Entity()
export class File extends BaseEntity {

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}
