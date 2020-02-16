import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
  @ObjectIdColumn()
  ot: ObjectID;

  @Column()
  name: string;

  @Column()
  lastname: string;

}
