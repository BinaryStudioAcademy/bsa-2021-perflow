import { AudioQuality } from '../enums/audio-quality';

export interface UserChangeSettings {
  language?: string;
  showExplicitContent?: boolean;
  autoplay?: boolean;
  quality?: AudioQuality;
  showNewReleases?: boolean;
  showFriendsPlaying?: boolean;
}
