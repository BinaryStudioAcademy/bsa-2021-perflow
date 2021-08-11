import { AuthorType } from '../enums/author-type.enum';

export class SongWriteDTO {
  public id: number;
  public name: string;
  public authorType: AuthorType;
  public artistId: number;
  public groupId?: number;
  public albumId: number;
  public duration: number;
  public hasCensorship: boolean;
  public createdAt: Date;
  public blobId: string;
}
