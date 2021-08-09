import { Pipe, PipeTransform } from '@angular/core';
import { AccessType } from 'src/app/models/playlist/accessType';

@Pipe({
  name: 'accessType'
})
export class AccessTypePipe implements PipeTransform {
  transform = (value: any, ...args: any[]): string => {
    let accessType: string;

    switch (value as AccessType) {
      case AccessType.secret:
        accessType = 'Secret';
        break;
      case AccessType.collaborative:
        accessType = 'Collaborative';
        break;
      case AccessType.default:
        accessType = 'Default';
        break;
      default:
        accessType = 'Default';
        break;
    }

    return accessType;
  };
}
