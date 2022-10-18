import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly role: Repository<Role>,
  ) {}
  async create(dto: CreateRoleDto) {
    const role = await this.role.save(dto);
    return role;
  }
  async getRoleByValue(value) {
    const role = await this.role.find({ where: { value: value } });
    return role;
  }
}
