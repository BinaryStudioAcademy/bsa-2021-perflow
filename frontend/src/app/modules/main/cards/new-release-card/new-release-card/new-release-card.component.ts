import { PlatformLocation } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlbumAuthor } from 'src/app/models/user/album-author';

@Component({
  selector: 'app-new-release-card',
  templateUrl: './new-release-card.component.html',
  styleUrls: ['./new-release-card.component.sass']
})
export class NewReleaseCardComponent implements OnInit{
  @Input() name: string;
  @Input() authors: Array<AlbumAuthor>;
  @Input() iconUrl: string;

  public baseUrl: string;

  constructor(
    private _location: PlatformLocation 
  ) {
  };

  public ngOnInit(){
    this.baseUrl = `${this._location.hostname}:${this._location.port}/`;
    console.log(`${this.baseUrl}artists/${this.authors[0].id}`);
  }
}
