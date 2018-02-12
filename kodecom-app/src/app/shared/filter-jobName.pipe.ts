import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterJobNamePipe',
  pure: false
})
export class FilterJobNamePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        console.log(filter);
        console.log(JSON.stringify(items));
        return items.filter(item => item.jobName != null && item.jobName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
