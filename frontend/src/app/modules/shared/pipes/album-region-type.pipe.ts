import { Pipe, PipeTransform } from '@angular/core';
import { AlbumRegion } from 'src/app/models/album/album-region';

@Pipe({
  name: 'albumRegion'
})
export class AlbumRegionTypePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    let albumRegion: string;

    switch (value as AlbumRegion) {
      case AlbumRegion.usa:
        albumRegion = 'USA';
        break;
      case AlbumRegion.uk:
        albumRegion = 'UK';
        break;
      case AlbumRegion.japan:
        albumRegion = 'Japan';
        break;
      case AlbumRegion.eu:
        albumRegion = 'EU';
        break;
      case AlbumRegion.cis:
        albumRegion = 'CIS';
        break;
      default:
        albumRegion = 'USA';
        break;
    }

    return albumRegion;
  };
}
