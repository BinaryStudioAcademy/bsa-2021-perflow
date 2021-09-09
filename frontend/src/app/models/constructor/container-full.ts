import { PageSectionFull } from './page-section-full';

export interface ContainerFull {
  id?: number;
  name: string;
  isPublished: boolean;
  showRecentlyPlayed: boolean;
  showMix: boolean;
  showRecommendations: boolean;
  pageSections: PageSectionFull[];
}
