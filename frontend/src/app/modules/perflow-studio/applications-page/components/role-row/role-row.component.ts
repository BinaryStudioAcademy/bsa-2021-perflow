import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { EditUserRole } from 'src/app/models/applicants/edit-user-role';
import { UserWithStatus } from 'src/app/models/applicants/user-with-status';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';
import { ApplicantsService } from 'src/app/services/applicants.service';

@Component({
  selector: 'app-role-row',
  templateUrl: './role-row.component.html',
  styleUrls: ['./role-row.component.sass']
})
export class RoleRowComponent {
  @Input() user = {} as UserWithStatus;

  @Output() editRole = new EventEmitter<EditUserRole>();
  readonly userRolesArray = [UserRoles.user, UserRoles.artist, UserRoles.moderator];

  constructor(private _applicantsService: ApplicantsService) {}

  menuClick(uRole: UserRoles, userId: number) {
    const userRole = {
      id: userId,
      role: uRole
    } as EditUserRole;

    this.editRole.emit(userRole);
  }
}
