import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile
} from 'ngx-image-cropper';
import { CroppedImageData } from 'src/app/models/shared/cropped.model';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.sass']
})
export class CropImageComponent implements OnInit {
  imageChangedEvent: any = '';
  imageFile: File;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  aspectRatio = 4 / 3;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  loading = false;

  @Input() file: File;

  @Output() isClosed = new EventEmitter<void>();
  @Output() croppedFile = new EventEmitter<CroppedImageData>();

  ngOnInit(): void {
    this.imageFile = this.file;
  }
  public onSubmit() {
    const tempFile: any = base64ToFile(this.croppedImage);
    tempFile.lastModifiedDate = new Date();
    tempFile.name = this.file.name;
    const result = {} as CroppedImageData;
    result.croppedImage = this.croppedImage;
    result.croppedFile = tempFile;
    this.croppedFile.emit(result as CroppedImageData);
  }
  cancelModal() {
    this.isClosed.emit();
  }

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  fileChangeEvent(event: any): void {
    this.loading = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.loading = false;
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }
}
