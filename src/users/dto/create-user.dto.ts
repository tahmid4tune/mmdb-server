import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import ExceptionMessages from '../../common/enums/exceptions.enum';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(20, { message: ExceptionMessages.NAME_LENGTH_ERROR })
  readonly name: string;

  @ApiProperty({ description: 'Email of user' })
  @IsEmail({}, { message: ExceptionMessages.EMAIL_NOT_VALID })
  readonly email: string;

  @ApiProperty({
    description:
      'Password must be between 8 to 20 characters and must be alphanumeric',
  })
  @IsString()
  @MinLength(8, { message: ExceptionMessages.PASSWORD_MIN_LENGTH_ERROR })
  @MaxLength(20, { message: ExceptionMessages.PASSWORD_MAX_LENGTH_ERROR })
  @IsAlphanumeric()
  password: string;

  @ApiProperty({ description: 'ConfirmedPassword must match Password' })
  @IsString()
  @Exclude({ toPlainOnly: true })
  confirmPassword: string;
}
