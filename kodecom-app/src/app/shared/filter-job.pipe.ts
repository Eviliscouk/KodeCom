import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterJobPipe',
  pure: false
})
export class FilterJobPipe implements PipeTransform {

  transform(items: any[], filter: number): any {
        if (!items || !filter || filter == 0) {
            return items;
        }

        return items.filter(item => (item.currentJob != null && item.currentJob == filter));
  }

}
