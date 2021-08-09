import { UserRoles } from '../enums/user-roles.enum';

export interface AuthUser {
  id: number;
  firebaseId: string;
  role: UserRoles;
  email: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
}
