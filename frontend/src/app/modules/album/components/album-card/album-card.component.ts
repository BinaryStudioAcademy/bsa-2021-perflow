import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/album/album';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.sass']
})
export class AlbumCardComponent {
  @Input()
  album: Album;

  constructor(private _router: Router) { }

  redirect(route: string, id: number) {
    this._router.navigate([route, id]);
  }
}
