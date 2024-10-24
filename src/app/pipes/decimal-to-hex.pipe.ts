
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalToHex',
  standalone: true
})
export class DecimalToHexPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

   
    if (typeof value === 'bigint') {
      return `0x${value.toString(16).toUpperCase()}`;
    }

    const intVal = parseInt(value, 10);

    if (isNaN(intVal) || intVal === -1) {
      return '';
    } else {
      return `0x${intVal.toString(16).toUpperCase()}`;
    }
  }
}
