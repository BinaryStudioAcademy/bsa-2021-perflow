import { AudioQuality } from '../enums/audio-quality';

export interface UserSettings {
  language: string;
  showExplicitContent: boolean;
  autoplay: boolean;
  quality: AudioQuality;
  showNewReleases: boolean;
  showFriendsPlaying: boolean;
}
