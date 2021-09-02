import { EntityType } from '../enums/entity-type';

export interface PageSectionEntityFull {
  id?: number;
  entityType: EntityType;
  entity: any;
  referenceId: number | undefined;
  position: number;
}
