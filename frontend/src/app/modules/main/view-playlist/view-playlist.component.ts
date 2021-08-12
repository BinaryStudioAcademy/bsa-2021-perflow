import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.sass']
})
export class ViewPlaylistComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  nextSlide = () => {};

  previousSlide = () => {};
}
