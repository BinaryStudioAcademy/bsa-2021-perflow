import { User } from './user';

export interface VerifiedUser extends User {
  emailVerified: boolean;
  token:string;
}
