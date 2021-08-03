import { Component, Input, OnInit } from '@angular/core';
import { AlbumView } from 'src/app/models/album/album-view';

@Component({
  selector: 'app-new-releases-card',
  templateUrl: './new-releases-card.component.html',
  styleUrls: ['./new-releases-card.component.sass']
})
export class NewReleasesCardComponent implements OnInit {
  @Input() public card!: AlbumView;

  public authors: string = '';

  ngOnInit() {
    console.log(this.card);
    this.card.songs.forEach(song => this.authors += (song.artist != null ? song.artist : song.group) + ', ');
    this.authors = this.authors.slice(0, -2);
    console.log(this.card.iconURL);
  }
}
