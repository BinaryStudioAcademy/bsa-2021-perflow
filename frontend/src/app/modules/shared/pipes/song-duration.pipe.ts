import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songDuration'
})
export class SongDurationPipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    let ticks = 0;
    const array = [...value];

    array.forEach((song) => {
      ticks += song.duration;
    });

    const hours = Math.floor(ticks / 3600);
    const minutes = Math.floor((ticks % 3600) / 60);
    const seconds = ticks % 3600 % 60;

    const h = hours === 0 ? '' : `${hours} hr`;
    const m = minutes === 0 ? '' : `${minutes} min`;
    const s = seconds === 0 ? '' : `${seconds} sec`;

    return `| ${h} ${m} ${s}` === '|   ' ? '' : `| ${h} ${m} ${s}`;
  };
}
