import { Pipe, PipeTransform } from '@angular/core';
import { TimeConverter } from 'src/app/helpers/TimeConverter';

@Pipe({
  name: 'songDuration'
})
export class SongDurationPipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    let result = 0;
    const array = [...value];

    array.forEach((song) => {
      result += song.duration;
    });
    return TimeConverter.secondsToMMSS(result);
  };
}
