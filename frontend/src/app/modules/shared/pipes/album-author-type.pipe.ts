import { Pipe, PipeTransform } from '@angular/core';
import { AuthorType } from 'src/app/models/enums/author-type.enum';

@Pipe({
  name: 'authorType'
})
export class AuthorTypePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    switch (value as AuthorType) {
      case AuthorType.group: return 'Group';
      default: return 'Artist';
    }
  };
}
