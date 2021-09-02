import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { CreatedGroup } from 'src/app/models/group/createdGroup';
import { CroppedImageData } from 'src/app/models/shared/cropped.model';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.sass']
})
export class GroupModalComponent {
  readonly pattern = '.*(.jpg$|.png$|.jpeg$)';

  isCropperModalShown = false;
  file: File;
  public tempIconURL: string = '';

  @Input() createdGroup: CreatedGroup;
  @Output() isClosed = new EventEmitter<void>();
  @Output() createGroup = new EventEmitter<CreatedGroup>();

  public onSubmit() {
    this.createdGroup.icon = this.file;
    this.createGroup.emit(this.createdGroup);
  }

  switchModal() {
    this.isCropperModalShown = !this.isCropperModalShown;
  }

  cancelModal() {
    this.isClosed.emit();
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

      this.isCropperModalShown = !this.isCropperModalShown;
    }
  };

  onSubmitModal = (croppedFile: CroppedImageData) => {
    this.isCropperModalShown = !this.isCropperModalShown;
    this.file = croppedFile.croppedFile;
    this.tempIconURL = croppedFile.croppedImage;
  };
}
