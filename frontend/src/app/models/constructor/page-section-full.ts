import { PageSectionEntityFull } from './page-section-entity-full';

export interface PageSectionFull {
  position: number;
  name: string;
  pageSectionEntities: PageSectionEntityFull[];
}
