import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { take } from 'rxjs/operators';
import { TagType } from 'src/app/models/enums/tag-type';
import { CreatedTag } from 'src/app/models/tag/created-tag';
import { Tag } from 'src/app/models/tag/tag';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SongTagsService } from 'src/app/services/tags/song-tags.service';
import { TagService } from 'src/app/services/tags/tag.service';
import { Type } from './models/type';

@Component({
  selector: 'app-create-tag-modal',
  templateUrl: './create-tag-modal.component.html',
  styleUrls: ['./create-tag-modal.component.sass']
})
export class CreateTagModalComponent {
  @Input()
  tags: Tag[];

  @Output()
  isClosed = new EventEmitter<void>();

  @Output()
  createTag = new EventEmitter<CreatedTag>();

  types: Type[] = [];
  tag: CreatedTag = { name: '' };

  constructor(
    private _snackbarService: SnackbarService,
    private _songTagsService: SongTagsService,
    private _tagService: TagService
  ) {
    this.getTypes();
  }

  onSubmit() {
    if (this.tags.some((t) => t.name === this.tag.name)) {
      this._snackbarService.show({ message: 'This tag already exists!', type: 'error' });
      return;
    }

    this._tagService.createTag(this.tag)
      .pipe(take(1))
      .subscribe((tag) => {
        this._songTagsService.update(tag);
        this.cancelModal();
      });
  }

  cancelModal() {
    this.isClosed.emit();
  }

  getTypes() {
    let i = 0;
    Object.keys(TagType).filter((key) => !Number(key) && key !== '0').forEach((key) => {
      this.types.push({ key: i, value: key });
      i += 1;
    });
  }
}
