import { Pipe, PipeTransform } from '@angular/core';
import { AuthorType } from 'src/app/models/enums/author-type.enum';

@Pipe({
  name: 'authorType'
})
export class AuthorTypePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    let authorType: string;

    switch (value as AuthorType) {
      case AuthorType.artist:
        authorType = 'Artist';
        break;
      case AuthorType.group:
        authorType = 'Group';
        break;
      default:
        authorType = 'Artist';
        break;
    }

    return authorType;
  };
}
