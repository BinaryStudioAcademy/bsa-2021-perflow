import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { TimeConverter } from 'src/app/helpers/TimeConverter';
import { SongInfo } from 'src/app/models/song/song-info';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { RecentlyPlayedService } from 'src/app/services/recently-played.service';
import { SongToolbarService } from 'src/app/services/song-toolbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-song-toolbar',
  templateUrl: './song-toolbar.component.html',
  styleUrls: ['./song-toolbar.component.sass']
})
export class SongToolbarComponent implements OnInit {
  @ViewChild('audio') audioRef! : ElementRef<HTMLAudioElement>;

  songForPlay: SongInfo = new SongInfo(0, 'NONAME', 'NOARTIST', '', '');
  userId: number;

  @Input()
  savedVolume: number = 100;
  @Input()
  isShuffling: boolean = false;
  @Input()
  isRepeating: boolean = false;
  @Input()
  isLiked: boolean = false;
  @Input()
  isQueueOpened = false;

  show: boolean = false;
  isTimeChanging = false;
  isPlaying = false;
  isMuted = false;

  @Output() queueClicked = new EventEmitter<void>();

  playPauseButton! : HTMLButtonElement | null;
  currentTimeContainer! : HTMLElement | null;
  durationContainer! : HTMLElement | null;
  seekSlider! : HTMLInputElement | null;
  volumeSlider! : HTMLInputElement | null;
  audio! : HTMLAudioElement | null;

  private _analyser: AnalyserNode;
  private _audioContext: AudioContext = new AudioContext();
  private _source: MediaElementAudioSourceNode;

  private readonly _fftSize = 256; // Fast Fourier Transform Size

  constructor(
    authService: AuthService,
    toolbarService: SongToolbarService,
    private _songsService: SongsService,
    private _reactionService: ReactionService,
    private _queueService: QueueService,
    private _rpService: RecentlyPlayedService
  ) {
    toolbarService.songUpdated$.subscribe(
      (song) => {
        this.updateSong(song);
        this._rpService.addSongViaId(song.id, this.userId, undefined).subscribe();
      }
    );

    toolbarService.playToggled$.subscribe(
      () => {
        this.playPause();
      }
    );

    authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

  ngOnInit(): void {
    this.playPauseButton = <HTMLButtonElement>document.getElementById('playbutton');
    this.seekSlider = <HTMLInputElement>document.getElementById('seek-slider');
    this.volumeSlider = <HTMLInputElement>document.getElementById('volume-slider');
    this.currentTimeContainer = document.getElementById('current-time');
    this.durationContainer = document.getElementById('duration');
    this.audio = document.querySelector('audio');
    this.audio!.crossOrigin = 'anonymous';
    this.initAudioContext();
  }

  initAudioContext() {
    this._analyser = this._audioContext.createAnalyser();
    this._source = this._audioContext.createMediaElementSource(this.audio!);
    this._source.connect(this._audioContext.destination);
    this._source.connect(this._analyser);
    this._analyser.fftSize = this._fftSize;
  }

  updateSong = (songInfo: SongInfo) => {
    this.songForPlay = songInfo;
    this.resetPlaying();
    this.audio?.load();
    this.show = true;
    this.audio!.loop = this.isRepeating;
    this.setLike();
  };

  setTimeChanging = (value: boolean) => {
    this.isTimeChanging = value;
  };

  resetPlaying = () => {
    this.isPlaying = false;
    this.playPauseButton?.lastElementChild?.classList.replace('pause', 'play');

    this._queueService.setPlaying(this.isPlaying);
  };

  songEnded = () => {
    this.resetPlaying();

    this.nextSongPlay();
  };

  updateTime() {
    this.displayCurrentTime();
    this.updateSeekSlider();
  }

  initSong = () => {
    this.displayDuration();
    this.setSeekSliderMax();
    this.setInitialVolume();
  };

  setVisibility(show: boolean) {
    this.show = show;
  }

  displayDuration = () => {
    let duration = 0;
    if (this.audio!.duration) {
      duration = this.audio!.duration;
    }

    this.durationContainer!.textContent = TimeConverter.secondsToMMSS(duration);
  };

  displayCurrentTime = () => {
    this.currentTimeContainer!.textContent = TimeConverter.secondsToMMSS(this.audio!.currentTime);
  };

  setSeekSliderMax = () => {
    this.seekSlider?.setAttribute('max', this.audio!.duration.toString());
  };

  updateSeekSlider = () => {
    if (!this.isTimeChanging) this.seekSlider!.value = Math.floor(this.audio!.currentTime).toString();
  };

  getSeekSliderValue = (event: Event) => {
    this.audio!.currentTime = Number.parseInt((<HTMLInputElement>event.target).value, 10);
  };

  getVolumeSliderValue = (event: Event) => {
    const volume = Number.parseInt((<HTMLInputElement>event.target).value, 10);
    this.savedVolume = volume;
    localStorage.setItem('savedVolume', this.savedVolume.toString());
    this.audio!.volume = volume / 100;
  };

  setInitialVolume = () => {
    let savedVolume = Number.parseInt(localStorage.getItem('savedVolume')!, 10);

    if (!savedVolume) {
      savedVolume = 40;
      localStorage.setItem('savedVolume', savedVolume.toString());
    }

    this.volumeSlider!.value = savedVolume.toString();
    this.audio!.volume = Number.parseInt(this.volumeSlider!.value, 10) / 100;
  };

  playPause = () => {
    if (!this.show) {
      return false;
    }

    if (this.isPlaying) {
      this.audio?.pause();
      this.isPlaying = false;
      this.playPauseButton?.lastElementChild?.classList.replace('pause', 'play');
    }
    else {
      this.audio?.play();
      this.isPlaying = true;
      this.playPauseButton?.lastElementChild?.classList.replace('play', 'pause');
    }

    this._queueService.setPlaying(this.isPlaying);

    return this.isPlaying;
  };

  muteUnmute = () => {
    if (this.isMuted) {
      this.isMuted = false;
      this.volumeSlider!.value = this.savedVolume.toString();
      this.audio!.volume = this.savedVolume / 100;
    }
    else {
      this.isMuted = true;
      this.volumeSlider!.value = '0';
      this.audio!.volume = 0;
    }
  };

  toggleShuffle = () => {
    this.isShuffling = !this.isShuffling;
  };

  toggleRepeat = () => {
    this.isRepeating = !this.isRepeating;
    this.audio!.loop = this.isRepeating;
  };

  toggleLike = () => {
    if (this.isLiked) {
      this._reactionService.removeLike(this.songForPlay.id, this.userId).subscribe(() => {
        this.isLiked = false;
      });
      return;
    }

    this._reactionService.likeSong(this.songForPlay.id, this.userId).subscribe(() => {
      this.isLiked = true;
    });
  };

  setLike = () => {
    const subscription = this._songsService.checkIfSongLiked(this.songForPlay.id).subscribe((response) => {
      this.isLiked = response.isLiked;
      subscription.unsubscribe();
    });
  };

  toggleQueue = () => {
    this.queueClicked.emit();
    this.isQueueOpened = !this.isQueueOpened;
  };

  nextSongPlay = () => {
    this._queueService.nextSong();
  };

  previousSongPlay = () => {
    this._queueService.previousSong();
  };

  resetToolbar = () => {
    this.resetPlaying();
    this.show = false;
    this.songForPlay = new SongInfo(0, 'NONAME', 'NOARTIST', '', '');
    this.audio!.src = this.songForPlay.songURL;
    this.displayDuration();
  };

  getAnalyser() {
    return this._analyser;
  }
}
