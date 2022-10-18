import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const user = await this.user.create(dto);
      const defaultRole = await this.roleService.getRoleByValue('USER');
      user.roles = defaultRole;
      this.user.save(user);

      return user;
    } catch (error) {
      return error;
    }
  }

  async findUser(email: string) {
    const user = await this.user.find({
      where: { email: email },
      relations: {
        roles: true,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.user.find({
      where: { email: email },
      relations: {
        roles: true,
      },
    });
    return user;
  }

  async findAll() {
    try {
      const users = await this.user.find({
        relations: {
          roles: true,
        },
      });
      return users;
    } catch (error) {
      return error;
    }
  }
}
