import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters long',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ description: 'ConfirmedPassword must match Password' })
  @IsString()
  @Exclude({ toPlainOnly: true })
  confirmedPassword: string;
}
