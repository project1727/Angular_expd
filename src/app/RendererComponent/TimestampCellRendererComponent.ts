import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TimestampConverterPipe } from '../pipes/timestamp-converter.pipe';

@Component({
  selector: 'app-timestamp-cell-renderer',
  template: `{{ transformedValue }}`,
  standalone: true,
  providers: [TimestampConverterPipe],
  imports: [TimestampConverterPipe],
})
export class TimestampCellRendererComponent implements ICellRendererAngularComp {
  private params: any;
  transformedValue: string = '';

  constructor(private timestampConverterPipe: TimestampConverterPipe) {}

  agInit(params: any): void {
    this.params = params;
    const time = params.value;
    const triggerTime = 0; 
    const precision = 4;
    this.transformedValue = this.timestampConverterPipe.transform(time, triggerTime, precision);
  }

  refresh(): boolean {
    return false;
  }
}
