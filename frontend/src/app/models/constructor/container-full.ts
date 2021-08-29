import { PageSectionFull } from './page-section-full';

export interface ContainerFull {
  name: string;
  isPublished: boolean;
  showRecentlyPlayed: boolean;
  showMix: boolean;
  pageSections: PageSectionFull[];
}
