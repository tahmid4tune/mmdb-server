import { User } from '../../users/entities/user.entity';

export interface Token {
  accessToken: string;
  refreshToken: string;
  user: User;
}
