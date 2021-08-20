import { Component, Input, OnInit } from '@angular/core';
import { AlbumAuthor } from 'src/app/models/user/album-author';

@Component({
  selector: 'app-new-release-card',
  templateUrl: './new-release-card.component.html',
  styleUrls: ['./new-release-card.component.sass']
})
export class NewReleaseCardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() authors: Array<AlbumAuthor>;
  @Input() iconUrl: string;

  public ngOnInit() {
    this.authors = this.authors.filter((author, i, arr) => arr.findIndex((t) => t.id === author.id) === i);
  }
}
