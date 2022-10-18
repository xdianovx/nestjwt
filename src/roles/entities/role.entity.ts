import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @ApiProperty({
    example: 1,
    description: 'Уникальный ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 3,
    description: 'ID роли',
  })
  @Column({
    default: 'USER',
  })
  value: string;

  @ApiProperty({
    example: 'Пользователь',
    description: 'Описание роли',
  })
  @Column()
  description: string;
}
