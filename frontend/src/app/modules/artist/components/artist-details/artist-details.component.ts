import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/user/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.sass']
})
export class ArtistDetailsComponent implements OnInit {
  artist: Artist = {} as Artist;

  constructor(private _route: ActivatedRoute, private _service: ArtistService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const artistId = this._route.snapshot.params.id;

    this._service.getArtist(artistId)
      .subscribe(
        (result) => {
          this.artist = result;
        }
      );
  }
}
