import { AccessType } from './accessType';

export interface EditedPlaylist {
  name: string;
  description: string;
  accessType: AccessType;
  iconURL: string;
  icon?: File;
}
