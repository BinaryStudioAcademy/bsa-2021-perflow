/* eslint-disable no-underscore-dangle */

import { Subject } from 'rxjs';

export class AudioFileDuration {
  private static _readerLoaded = new Subject<number>();
  private static _getDuration$ = AudioFileDuration._readerLoaded.asObservable();

  static getDuration(song: File) {
    const audio = document.createElement('audio');
    const reader = new FileReader();

    reader.onload = function emitDuration(e) {
      audio.src = e.target?.result as string;
      audio.addEventListener('loadedmetadata', () => {
        AudioFileDuration._readerLoaded.next(audio.duration);
      });
    };

    reader.readAsDataURL(song);

    return AudioFileDuration._getDuration$;
  }
}
