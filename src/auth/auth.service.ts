import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto) {
    let user = await this.userService.getUserByEmail(dto.email);
    const isPassword = await bcrypt.compare(dto.password, user[0].password);

    if (!user[0]) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    if (!isPassword) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const token = await this.jwtService.sign({
      id: user[0].id,
      email: user[0].email,
    });

    const res = [user[0], token];
    return token;
  }

  async register(dto: CreateUserDto) {
    const [...candidate] = await this.userService.getUserByEmail(dto.email);
    if (candidate[0]?.email) {
      throw new HttpException(
        'Данный email уже зарегестрирован в системе',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hashPassword = await bcrypt.hash(dto.password, 5);
      const user = this.userService.create({ ...dto, password: hashPassword });
      return user;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
    if (user && user[0].password === password) {
      const { password, ...userData } = user[0];
      return userData;
    }
    return null;
  }
}
