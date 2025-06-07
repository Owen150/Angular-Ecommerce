import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWordsPipe'
})
export class LimitWordsPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
