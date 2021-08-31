import { AccessType } from "./accessType";

export interface PlaylistView {
  id: number;
  name: string;
  description: string;
  iconURL: string;
  accessType?: AccessType;
}
