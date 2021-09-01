import { UserRoles } from '../enums/user-roles.enum';

export interface UserWithStatus {
  id: number,
  userName: string,
  iconURL: string,
  role: UserRoles
  group?: string
  groupId?: number
}
