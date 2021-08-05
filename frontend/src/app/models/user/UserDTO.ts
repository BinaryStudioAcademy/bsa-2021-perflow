export class UserDTO {
  id!: number;
  createdAt: Date;
  userName!: string;
  iconURL!: string;
  email!: string;
  birthday!: Date;
  gender!: boolean;
  description!: string;
  country!: string;
  password!: string;
  salt!: string;
  groupId: number;
}
