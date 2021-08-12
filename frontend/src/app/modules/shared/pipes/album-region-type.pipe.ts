import { Pipe, PipeTransform } from '@angular/core';
import { AlbumRegion } from 'src/app/models/album/album-region';

@Pipe({
  name: 'albumRegion'
})
export class AlbumRegionTypePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    switch (value as AlbumRegion) {
      case AlbumRegion.usa: return 'USA';
      case AlbumRegion.uk: return 'UK';
      case AlbumRegion.japan: return 'Japan';
      case AlbumRegion.eu: return 'EU';
      default: return 'CIS';
    }
  };
}
