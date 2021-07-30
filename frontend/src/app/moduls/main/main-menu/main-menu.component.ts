import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {


  // TODO: Tempolary array
  playlists: string[] = [
    "Home",
    "Search",
    "My playlists",
    "Linked songs"
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public CreatePlaylist() { }
}
