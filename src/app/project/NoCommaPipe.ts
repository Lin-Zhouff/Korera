import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma'
})
export class NoCommaPipe implements PipeTransform {

  transform(value: any): string {
    let res = value.toString();
    if (res !== undefined && res !== null) {
      return res.replace(/,/g, " ");
    } else {
      return "";
    }
  }
}
