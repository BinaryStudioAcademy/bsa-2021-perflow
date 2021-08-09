import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsSum'
})
export class ItemsSumPipe implements PipeTransform {
  transform = (items: any[], attr: string): number => items.reduce((a, b) => a + b[attr], 0);
}
