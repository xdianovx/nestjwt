import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  uId: any;

  @Column()
  expires_at: any;
}
