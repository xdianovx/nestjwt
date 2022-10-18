import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly token: Repository<Token>,
  ) {}

  async create(dto: CreateUserTokenDto) {
    const userToken = await this.token.save(dto);
    return userToken;
  }

  async delete(uId: string) {
    return await this.token.delete(uId);
  }

  //   async deleteAll(uId: any) {
  //     return await this.token.delete(uId);
  //   }

  //   async exists(uId: string, token: string) {
  //     return await this.token.exists({ uId, token });
  //   }
}
