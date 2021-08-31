import { Pipe, PipeTransform } from '@angular/core';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    switch (value as UserRoles) {
      case UserRoles.user: return 'User';
      case UserRoles.artist: return 'Artist';
      case UserRoles.teamMember: return 'Team Member';
      case UserRoles.moderator: return 'Moderator';
      default: return 'User';
    }
  };
}
