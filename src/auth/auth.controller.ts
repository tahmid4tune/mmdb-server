import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    return this.authService.createTokenForUser(user);
  }

  @Get('whoami')
  async whoami(@CurrentUser() user: User) {
    return await this.authService.getUser(user.id);
  }

  @Post('refresh')
  @Public()
  @UseGuards(AuthGuard('jwt-refreshtoken'))
  async refresh(@CurrentUser() user: User) {
    return await this.authService.createTokenForUser(user);
  }
}
