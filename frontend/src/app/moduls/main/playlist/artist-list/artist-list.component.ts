import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/User';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass']
})
export class ArtistListComponent implements OnInit {
  artists!: User[];

  constructor(private _artistService: ArtistService) { }

  ngOnInit(): void {
    this._artistService.getArtistsByUserId(1).subscribe(
      (response) => {
        console.log(response);
        this.artists = response;
        console.log(this.artists);
      }
    );
  }
}
