import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DecimalToHexPipe } from '../pipes/decimal-to-hex.pipe';  // Make sure this path is correct

@Component({
  selector: 'app-decimal-to-hex-cell-renderer',
  template: `{{ transformedValue }}`,
  standalone: true,
  providers: [DecimalToHexPipe], 
  imports: [DecimalToHexPipe],
})
export class DecimalToHexCellRendererComponent implements ICellRendererAngularComp {
  transformedValue: string = '';

  constructor(private decimalToHexPipe: DecimalToHexPipe) {}

  agInit(params: any): void {
    const decimalValue = params.value;
    this.transformedValue = this.decimalToHexPipe.transform(decimalValue);
  }

  refresh(): boolean {
    return false;
  }
}

