import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }
  async getAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async getRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_JWT_SECRET'),
    });
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async createTokenForUser(user: User): Promise<Token> {
    const iat = parseInt(String(new Date().getTime() / 1000));
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
      iat,
      sub: String(user.id),
      exp: Number(
        iat + Number(this.configService.get('TOKEN_EXPIRATION_PERIOD')),
      ),
    };
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken({
        ...payload,
        exp: Number(
          iat + this.configService.get('REFRESH_TOKEN_EXPIRATION_PERIOD'),
        ),
      }),
      user: user,
    };
  }
  async getUser(id: number): Promise<User> {
    return await this.usersService.showWhoAmI(id);
  }
}
