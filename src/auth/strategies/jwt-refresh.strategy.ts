import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt.interface';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_JWT_SECRET'),
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.getUser(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (new Date() >= new Date(payload.exp * 1000)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
