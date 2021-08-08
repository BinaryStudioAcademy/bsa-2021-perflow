import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumDuration'
})
export class AlbumDurationPipe implements PipeTransform {
  private _hourInMs: number = 3600000;

  transform = (seconds: number): string | null => {
    const ms: number = seconds * 1000;
    const dp: DatePipe = new DatePipe('en-US');
    return (ms >= this._hourInMs) ? dp.transform(ms, 'HH:mm:ss') : dp.transform(ms, 'mm:ss');
  };
}
