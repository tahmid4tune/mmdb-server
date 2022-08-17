import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { EntityDeletionResponse } from '../common/interfaces/entity-deletion-response';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Delete()
  async removeOwnUser(
    @CurrentUser() user: User,
  ): Promise<EntityDeletionResponse> {
    await this.usersService.remove(user);
    return { message: 'User deleted successfully' };
  }
}
