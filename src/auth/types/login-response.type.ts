import { User } from '../../users/domain/user';

export type AuthResponseType = Readonly<{
  token?: string;
  refreshToken?: string;
  tokenExpires?: number;
  user: User;
}>;
