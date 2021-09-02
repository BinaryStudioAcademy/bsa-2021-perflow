import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { UserWithStatus } from 'src/app/models/applicants/user-with-status';
import { EditUserApplicationStatus } from 'src/app/models/applicants/user-status-response';
import { ApplicationStatus } from 'src/app/models/applicants/application-status';
import { ApplicantsService } from 'src/app/services/applicants.service';

@Component({
  selector: 'app-aplicant-row',
  templateUrl: './aplicant-row.component.html',
  styleUrls: ['./aplicant-row.component.sass']
})
export class AplicantRowComponent {
  private _userApplicationStatus: EditUserApplicationStatus;

  @Input() applicant = {} as UserWithStatus;

  @Output() setStatus = new EventEmitter<EditUserApplicationStatus>();

  constructor(private _applicantsService: ApplicantsService) { }

  approve() {
    this._userApplicationStatus = {
      id: this.applicant.id,
      status: ApplicationStatus.approved
    };

    this.setStatus.emit(this._userApplicationStatus);
  }

  reject() {
    this._userApplicationStatus = {
      id: this.applicant.id,
      status: ApplicationStatus.rejected
    };

    this.setStatus.emit(this._userApplicationStatus);
  }
}
