import { Component, Input } from '@angular/core';
import { UserWithStatus } from 'src/app/models/applicants/user-with-status';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';

@Component({
  selector: 'app-role-row',
  templateUrl: './role-row.component.html',
  styleUrls: ['./role-row.component.sass']
})
export class RoleRowComponent {
  @Input() applicant = {} as UserWithStatus;

  constructor() {
    this.applicant = {
      id: 1,
      role: UserRoles.moderator,
      iconURL: 'http://127.0.0.1:10000/devstoreaccount1/images/8a0870fc-3e7d-47cc-8223-c7b7d046e8fd',
      userName: 'Robert Miles Junior'
    };
  }
}
