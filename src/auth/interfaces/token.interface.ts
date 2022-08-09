import { User } from '../../users/entities/user.entity';

export interface Token {
  access_token: string;
  refresh_token: string;
  user: User;
}
