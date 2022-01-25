import { UsersService } from './../users/users.service';
import { User } from './../users/users.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Refresh } from 'src/auth/refresh.model';
import refreshDto from './dto/refresh.dto';
import { RefreshTokenEncoded } from './types/refreshTokenEncoded';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Refresh) private refreshRepository: typeof Refresh,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateAccessRefreshTokens(user);
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByUsername(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return await this.generateAccessRefreshTokens(user);
  }

  async refresh(refreshDto: refreshDto) {
    try {
      const token: RefreshTokenEncoded = this.jwtService.verify(
        refreshDto.refreshToken,
      );
      const tokenUUID = await this.refreshRepository.findByPk(token.tokenId);
      if (!tokenUUID) {
        throw new Error();
      }
      await tokenUUID.destroy();
      const user = await this.usersService.getUserById(token.userId);
      return this.generateAccessRefreshTokens(user);
    } catch (error) {
      throw new HttpException('Token is not valid', HttpStatus.UNAUTHORIZED);
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.email);

    let passwordEquals = false;
    if (user) {
      passwordEquals = await bcrypt.compare(userDto.password, user.password);
    }
    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async generateAccessRefreshTokens(user: User) {
    const access = this.generateToken(user);
    const refresh = await this.generateRefreshToken(user);
    return {
      ...access,
      ...refresh,
    };
  }
  private async generateRefreshToken(user: User) {
    const token = await this.refreshRepository.create();
    const data = {
      userId: user.id,
      tokenId: token.id,
    };
    const expiration = `30d`;
    return {
      refreshToken: this.jwtService.sign(data, { expiresIn: expiration }),
    };
  }
}
