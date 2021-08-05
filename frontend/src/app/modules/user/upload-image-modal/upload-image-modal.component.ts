import { Component, OnInit} from '@angular/core';
import { FileUploadType } from 'src/app/models/shared/FileUploadType';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.sass']
})
export class UploadImageModalComponent implements OnInit {
  public fileType: FileUploadType = FileUploadType.images;
  public files: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(files: any) {
    this.files = files;
    console.log(this.files);
  }

}
