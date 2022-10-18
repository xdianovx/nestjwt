import { ApiProperty } from '@nestjs/swagger';
import { JoinTable } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test@rudemy.ru',
    description: 'Уникальный почтовый адрес',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'JSd67s3d',
    description: 'Пароль не менее 8-ми символов',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'Петр',
    description: 'Имя',
  })
  @Column({
    name: 'first_name',
    nullable: true,
  })
  firstName: string;

  @ApiProperty({
    example: 'Васильев',
    description: 'Фамилия',
  })
  @Column({
    name: 'last_name',
    nullable: true,
  })
  lastName: string;

  @ApiProperty({
    example: 25,
    description: 'Возраст',
  })
  @Column({
    nullable: true,
  })
  age: number;

  @ApiProperty({
    example: 3,
    description: 'Пользователь',
  })
  @ManyToMany(() => Role, (role) => role, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    example: '2022-10-08 16:14:37.150128',
    description: 'Дата создания',
  })
  @CreateDateColumn()
  created_at: any;

  @ApiProperty({
    example: '2022-10-08 16:14:37.150128',
    description: 'Дата обновления',
  })
  @UpdateDateColumn()
  updated_at: any;
}
