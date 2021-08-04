import {
  Component, ElementRef, Input, OnInit, ViewChild
} from '@angular/core';
import { TimeConverter } from 'src/app/helpers/TimeConverter';
import { SongInfo } from 'src/app/models/common/SongInfo';

@Component({
  selector: 'app-song-toolbar',
  templateUrl: './song-toolbar.component.html',
  styleUrls: ['./song-toolbar.component.sass']
})
export class SongToolbarComponent implements OnInit {
  @ViewChild('audio') audioRef! : ElementRef<HTMLAudioElement>;

  songForPlay: SongInfo = new SongInfo('NONAME', 'NOARTIST', '', '');

  @Input()
  savedVolume: number = 100;
  @Input()
  isShuffling: boolean = false;
  @Input()
  isRepeating: boolean = false;
  @Input()
  isLiked: boolean = false;

  show: boolean = false;
  isTimeChanging = false;
  isPlaying = false;
  isMuted = false;

  playPauseButton! : HTMLButtonElement | null;
  currentTimeContainer! : HTMLElement | null;
  durationContainer! : HTMLElement | null;
  seekSlider! : HTMLInputElement | null;
  volumeSlider! : HTMLInputElement | null;
  audio! : HTMLAudioElement | null;

  ngOnInit(): void {
    this.playPauseButton = <HTMLButtonElement>document.getElementById('playbutton');
    this.seekSlider = <HTMLInputElement>document.getElementById('seek-slider');
    this.volumeSlider = <HTMLInputElement>document.getElementById('volume-slider');
    this.currentTimeContainer = document.getElementById('current-time');
    this.durationContainer = document.getElementById('duration');
    this.audio = document.querySelector('audio');
  }

  updateSong = (songInfo: SongInfo) => {
    this.songForPlay = songInfo;
    this.resetPlaying();
    this.audio?.load();
    this.show = true;
    this.audio!.loop = this.isRepeating;
  };

  setTimeChanging = (value: boolean) => {
    this.isTimeChanging = value;
  };

  resetPlaying = () => {
    this.isPlaying = false;
    this.playPauseButton?.lastElementChild?.classList.replace('pause', 'play');
  };

  updateTime() {
    this.displayCurrentTime();
    this.updateSeekSlider();
  }

  initSong = () => {
    this.displayDuration();
    this.setSeekSliderMax();
    this.setInitialVolume();
    this.playPause();
  };

  setVisibility(show: boolean) {
    this.show = show;
  }

  displayDuration = () => {
    this.durationContainer!.textContent = TimeConverter.secondsToMMSS(this.audio!.duration);
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
    this.audio!.volume = volume / 100;
  };

  setInitialVolume = () => {
    this.audio!.volume = Number.parseInt(this.volumeSlider!.value, 10) / 100;
  };

  playPause = () => {
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
}
