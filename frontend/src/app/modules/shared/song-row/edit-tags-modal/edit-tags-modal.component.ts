import {
  AfterViewInit,
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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
export class EditTagsModalComponent implements OnInit, OnDestroy, AfterViewInit {
  private _unsubscribe$ = new Subject<void>();

  @Input() tags: Tag[];
  @Input() song: Song;

  @Output() isClosed = new EventEmitter<void>();
  @Output() updatedTags = new EventEmitter<Tag[]>();

  class: string;
  selected: string[] = [];

  constructor(
    private _tagService: TagService,
    private _songTagsService: SongTagsService,
    private _snackbarService: SnackbarService
  ) {

  }

  ngAfterViewInit() {
    this.initSelected();
  }

  ngOnInit() {
    this.class = this.song.id.toString();
    this.subscribeToTagUpdates();
  }

  initSelected() {
    if (this.song.tags && this.song.tags!.length > 0) {
      this.selected = this.song.tags!.map((t) => t.name);
      $(`#${this.class}`).dropdown('set selected', this.selected);
    }
  }

  subscribeToTagUpdates() {
    this._songTagsService.tagSubjectState$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (tag) => {
          if (!this.tags.some((t) => t.name === tag.name)) {
            this.tags.push(tag);
          }
        }
      );
  }

  close() {
    $(`#${this.class}`).dropdown('clear');
    this.initSelected();
  }

  onSubmit() {
    this.selected = this.getTags();
    const newTags = this.selected.filter((tag) => !this.tags.find((t) => t.name === tag));

    if (newTags.length > 0) {
      this._tagService.createTags({ tags: newTags })
        .pipe(take(1))
        .subscribe((tags) => {
          tags.forEach((tag) => {
            this._songTagsService.update(tag);
          });
          this.addTagsToSong(this.tags.filter((tag) => this.selected.find((t) => t === tag.name)));
        });
      return;
    }

    this.addTagsToSong(this.tags.filter((tag) => this.selected.find((t) => t === tag.name)));
  }

  addTagsToSong(newTags: Tag[]) {
    this._tagService.addTagsToSong({ songId: this.song.id, tags: newTags })
      .pipe(take(1))
      .subscribe(() => {
        this.updatedTags.emit(newTags);
        this.initSelected();
        $(`.edit.${this.class}`).modal('hide');
      },
      (e: Error) => {
        this._snackbarService.show({ message: e.message, type: 'error', header: 'Error occured!' });
      });
  }

  getTags() {
    return $(`#${this.class}`).val() as string[];
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
