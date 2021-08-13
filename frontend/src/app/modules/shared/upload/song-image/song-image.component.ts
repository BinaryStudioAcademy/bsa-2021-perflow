import { Component, Input, Output } from '@angular/core';
import { FileSizeConverter } from 'src/app/helpers/FileSizeConverter';
import { FileUploadType } from 'src/app/models/common/file-upload-type';

@Component({
  selector: 'app-song-image',
  templateUrl: './song-image.component.html',
  styleUrls: ['./song-image.component.sass']
})
export class SongImageComponent {
  @Input()
  fileType: FileUploadType = FileUploadType.audio;
  @Output()
  files: File[] = [];

  filesDropped(files: File[]): void {
    this.files = this.files.concat(files);
  }

  filesAddedByButton(event: Event): void {
    const files: File[] = Array.from((event.target as HTMLInputElement).files as FileList)
      .filter((item) => !this.files.some((file) => file.name === item.name));

    this.files = this.files.concat(files);
  }
  delete = (file: File) => {
    const index = this.files.findIndex((f) => f.name === file.name);
    this.files.splice(index, 1);
  };
  bytesToSize = FileSizeConverter.bytesToSize;
}
