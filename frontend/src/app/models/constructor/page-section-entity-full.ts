import { EntityType } from '../enums/entity-type';

export interface PageSectionEntityFull {
  entityType: EntityType;
  entity: any;
  entityId: number | undefined;
  position: number;
}
