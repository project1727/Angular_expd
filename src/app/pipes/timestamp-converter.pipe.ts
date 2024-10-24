import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampConverter',
  standalone: true  
})
export class TimestampConverterPipe implements PipeTransform {

  transform(time: number, triggerTime: number = 0, precision: number = 4): string {
    if (isNaN(time) || isNaN(triggerTime)) {
      return '';
    }

    if (triggerTime < 0) {
      triggerTime = 0;
    }

    const strValue = time - triggerTime;
    return this.toEngineeringNotation(strValue, precision) + 's';
  }

  toEngineeringNotation(value: number, precision: number): string {
    return value.toFixed(precision);
  }
}
