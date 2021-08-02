import { Component } from '@angular/core';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.sass']
})
export class AllPlaylistsComponent {
// TODO: Here insert array count songs
  likedSongs: number = 256;
// TODO: tempolary albums
  images: string[] = [
    './../../../../assets/tepolary-images/Card 1.png',
    './../../../../assets/tepolary-images/Card 2.png',
    './../../../../assets/tepolary-images/Card 3.png',
    './../../../../assets/tepolary-images/Card 4.png'   
  ];
}
