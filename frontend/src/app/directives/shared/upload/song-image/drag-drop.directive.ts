import {
  Directive, EventEmitter, HostBinding, HostListener, Input, Output
} from '@angular/core';
import { FileUploadType } from 'src/app/models/shared/FileUploadType';

@Directive({
  selector: '[appDragDrop]'
})

export class DragDropDirective
{
  @Output()
  files: EventEmitter<File[]> = new EventEmitter();
  @Input()
  type : FileUploadType = FileUploadType.audio;
  @Input()
  addedFiles : File[] = [];
  @HostBinding('style.background')
  @HostListener('dragover', ['$event'])
  public onDragOver = (evt: DragEvent) =>
  {
    evt.preventDefault();
    evt.stopPropagation();
  };
  @HostListener('dragleave', ['$event'])
  public onDragLeave = (evt: DragEvent) =>
  {
    evt.preventDefault();
    evt.stopPropagation();
  };
  @HostListener('drop', ['$event'])
  public onDrop = (evt: DragEvent) =>
  {
    evt.preventDefault();
    evt.stopPropagation();

    const files: File[] = Array.from(evt.dataTransfer!.files)
      .filter((item) => !this.addedFiles.some((file) => file.name === item.name));

    switch (this.type)
    {
      case FileUploadType.audio:
        if (files.some((f) => !f.type.startsWith('audio')))
        {
          return;
        }
        break;
      case FileUploadType.images:
        if (files.some((f) => !f.type.startsWith('image')))
        {
          return;
        }
        break;
      default:
    }

    if (files.length > 0)
    {
      this.files.emit(files);
    }
  };
}
