import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDisplayNamePipe',
  pure: false
})
export class FilterDisplayNamePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        return items.filter(item => item.displayName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
