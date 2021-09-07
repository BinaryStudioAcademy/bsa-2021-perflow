import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TagType } from 'src/app/models/enums/tag-type';
import { Song } from 'src/app/models/song/song';
import { Tag } from 'src/app/models/tag/tag';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SongTagsService } from 'src/app/services/tags/song-tags.service';
import { TagService } from 'src/app/services/tags/tag.service';

@Component({
  selector: 'app-edit-tags-modal',
  templateUrl: './edit-tags-modal.component.html',
  styleUrls: ['./edit-tags-modal.component.sass']
})
export class EditTagsModalComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  private readonly _maxNumberOfTags = 3;

  @Input() tags: Tag[];
  @Input() song: Song;

  @Output() isClosed = new EventEmitter<void>();
  @Output() updatedTags = new EventEmitter<Tag[]>();

  musicStyleTags: Tag[] = [];
  otherTags: Tag[] = [];
  selectedMusicStyleTags: Tag[] = [];
  selectedOtherTags: Tag[] = [];
  isModalShown = false;
  class: string;

  constructor(
    private _tagService: TagService,
    private _songTagsService: SongTagsService,
    private _snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.updateSelectedTags();
    this.updateTags();
    this.class = this.song.id.toString();
    this.subscribeToTagUpdates();
  }

  clear() {
    this.updateSelectedTags();
    this.updateTags();
  }

  subscribeToTagUpdates() {
    this._songTagsService.tagSubjectState$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (tag) => {
          if (!this.tags.some((t) => t.name === tag.name)) {
            this.tags.push(tag);
          }

          this.updateTags();
        }
      );
  }

  updateModal() {
    this.isModalShown = !this.isModalShown;
  }

  updateTags() {
    this.musicStyleTags = this.tags
      .filter((tag) => tag.type === TagType.musicStyle
        && !this.selectedMusicStyleTags.find((t) => t.name === tag.name));
    this.otherTags = this.tags
      .filter((tag) => tag.type === TagType.other && !this.selectedOtherTags.find((t) => t.name === tag.name));
  }

  updateSelectedTags() {
    this.selectedMusicStyleTags = this.song.tags!.filter((t) => t.type === TagType.musicStyle);
    this.selectedOtherTags = this.song.tags!.filter((t) => t.type === TagType.other);
  }

  addMusicStyleTag(tag: Tag) {
    this.selectedMusicStyleTags.push(tag);

    const index = this.musicStyleTags.indexOf(tag);
    this.musicStyleTags.splice(index, 1);
  }

  addOtherTag(tag: Tag) {
    this.selectedOtherTags.push(tag);

    const index = this.otherTags.indexOf(tag);
    this.otherTags.splice(index, 1);
  }

  deleteOtherTag(tag: Tag) {
    this.otherTags.push(tag);

    const index = this.selectedOtherTags.indexOf(tag);
    this.selectedOtherTags.splice(index, 1);
  }

  deleteMusicStyleTag(tag: Tag) {
    this.musicStyleTags.push(tag);

    const index = this.selectedMusicStyleTags.indexOf(tag);
    this.selectedMusicStyleTags.splice(index, 1);
  }

  addTagsToSong() {
    const newTags: Tag[] = this.selectedOtherTags.concat(this.selectedMusicStyleTags);

    if (newTags.length > this._maxNumberOfTags) {
      this._snackbarService.show({ message: `No more than ${this._maxNumberOfTags} tags`, type: 'error' });
      return;
    }

    this._tagService.addTagsToSong({ songId: this.song.id, tags: newTags })
      .pipe(take(1))
      .subscribe(() => {
        this.updatedTags.emit(newTags);
        this.clear();
        $(`.edit.${this.class}`).modal('hide');
      },
        (e: Error) => {
          this._snackbarService.show({ message: e.message, type: 'error', header: 'Error occured!' });
        });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }
}
