import { AccessType } from './accessType';

export interface EditedPlaylist {
  id: number;
  name: string;
  description: string;
  accessType: AccessType;
  iconURL: string;
  icon?: File;
}
