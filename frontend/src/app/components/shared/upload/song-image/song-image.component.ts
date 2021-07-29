import { Component, Input } from '@angular/core';
import { FileUploadType } from 'src/app/models/shared/FileUploadType';

@Component({
  selector: 'app-song-image',
  templateUrl: './song-image.component.html',
  styleUrls: ['./song-image.component.sass']
})
export class SongImageComponent
{
  @Input()
  fileType: FileUploadType = FileUploadType.audio;
  files: File[] = [];
  filesDropped(files: File[]): void
  {
    this.files = this.files.concat(files);
  }
  filesAddedByButton(event : Event): void
  {
    const files : File[] = Array.from((event.target as HTMLInputElement).files as FileList)
      .filter((item) => !this.files.some((file) => file.name === item.name));;

    this.files = this.files.concat(files);
  }
  bytesToSize = (bytes : number) =>
  {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / 1024 ** i + Number.EPSILON) * 100) / 100} ${sizes[i]}`;
  };
  delete = (file: File) =>
  {
    const index = this.files.findIndex((f) => f.name === file.name);
    this.files.splice(index, 1);
  };
}
