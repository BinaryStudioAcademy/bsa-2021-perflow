import {
  EventEmitter, Output, Component, Input, OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { GroupEdit } from 'src/app/models/group/group-edit';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.sass']
})
export class EditGroupModalComponent implements OnInit {
  readonly pattern = '.*(.jpg$|.png$|.jpeg$)';
  file: File;

  userId: number;
  userName: string;
  tempIconURL: string;
  description: string;
  name: string;

  @Input() editedGroup: GroupEdit = { } as GroupEdit;

  @Output() isClosed = new EventEmitter<void>();
  @Output() editGroup = new EventEmitter<GroupEdit>();

  constructor(
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

  ngOnInit() {
    this.tempIconURL = this.editedGroup.iconURL;
    this.description = this.editedGroup.description;
    this.name = this.editedGroup.name;
  }

  public onSubmit() {
    this.editedGroup.iconURL = this.tempIconURL;
    this.editedGroup.icon = this.file;
    this.editedGroup.description = this.description;
    this.editedGroup.name = this.name;

    this.editGroup.emit(this.editedGroup);
  }

  loadIcon = (event: Event) => {
    const [file] = Array.from((event.target as HTMLInputElement).files as FileList);

    if (RegExp(this.pattern).test(file.name)) {
      this.file = file;
      const reader = new FileReader();

      reader.onload = (event2: ProgressEvent<FileReader>) => {
        this.tempIconURL = event2.target?.result as string;
      };

      reader.readAsDataURL(this.file);
    }
  };

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  cancelModal() {
    this.isClosed.emit();
  }
}
