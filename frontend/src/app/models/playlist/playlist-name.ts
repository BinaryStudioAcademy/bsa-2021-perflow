import { AccessType } from './accessType';

export interface PlaylistName {
  id: number;
  name: string;
  accessType?: AccessType
}
