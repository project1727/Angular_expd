import { Pipe, PipeTransform } from '@angular/core';
import { delay } from 'rxjs';

@Pipe({
  name: 'enumToString',
  standalone: true
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: number, enumType: any): string {
    delay(100);
    return enumType[value];
  }
}
