import { PageSectionEntityFull } from './page-section-entity-full';

export interface PageSectionFull {
  id?: number;
  position: number;
  name: string;
  pageSectionEntities: PageSectionEntityFull[];
}
