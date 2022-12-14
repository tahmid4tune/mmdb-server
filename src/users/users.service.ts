import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ExceptionMessages from '../common/enums/exceptions.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException(ExceptionMessages.PASSWORDS_MISMATCH);
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(ExceptionMessages.EMAIL_ALREADY_EXISTS);
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(currentUser: User) {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
    });
    if (!user) {
      throw new BadRequestException(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async remove(user: User) {
    await this.usersRepository.softDelete(user.id);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async showWhoAmI(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(ExceptionMessages.USER_NOT_FOUND);
    }
    return user;
  }
}
