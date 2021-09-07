import { TagType } from '../enums/tag-type';

export interface Tag {
  id: number;
  name: string;
  type: TagType;
}
