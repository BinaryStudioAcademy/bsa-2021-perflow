/* eslint-disable no-underscore-dangle */

import { Subject } from 'rxjs';

export class AudioFileDuration {
  static getDuration(song: File) {
    const readerLoaded = new Subject<number>();
    const getDuration$ = readerLoaded.asObservable();

    const audio = document.createElement('audio');
    const reader = new FileReader();

    reader.onload = function emitDuration(e) {
      audio.src = e.target?.result as string;
      audio.addEventListener('loadedmetadata', () => {
        readerLoaded.next(audio.duration);
      });
    };

    reader.readAsDataURL(song);

    return getDuration$;
  }
}
