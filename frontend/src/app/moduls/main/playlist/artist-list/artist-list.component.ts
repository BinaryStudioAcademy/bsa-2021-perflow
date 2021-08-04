import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user/UserDTO';
import { ArtistService } from 'src/app/services/artist.service';
import { ArtistCardComponent } from '../../cards/artist-card/artist-card.component';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass']
})
export class ArtistListComponent implements OnInit {
  artists!: UserDTO[];

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
