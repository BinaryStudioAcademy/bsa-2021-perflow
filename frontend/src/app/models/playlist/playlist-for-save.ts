import { AccessType } from './accessType';

export interface PlaylistForSave {
  id: number;
  name: string;
  description: string;
  icon?: File;
  accessType: AccessType;
}
