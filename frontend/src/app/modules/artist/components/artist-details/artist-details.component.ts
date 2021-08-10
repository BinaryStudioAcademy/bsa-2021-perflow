import { Component } from '@angular/core';
import { Album } from 'src/app/models/album/album';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.sass']
})
export class ArtistDetailsComponent {
  artist: User = {} as User;
  albums: Album[] = [];
}
