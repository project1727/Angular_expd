import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { EnumToStringPipe } from '../pipes/enum-to-discription-converter.pipe';

@Component({
  selector: 'app-enum-to-string-cell-renderer',
  template: `{{ transformedValue }}`,
  standalone: true,
  providers: [EnumToStringPipe], 
  imports: [EnumToStringPipe],
})
export class EnumToStringCellRendererComponent implements ICellRendererAngularComp {
  private params: any;
  transformedValue: string = '';

  constructor(private enumToStringPipe: EnumToStringPipe) {}

  agInit(params: any): void {
    this.params = params;
    const enumValue = params.value;
    const enumType = params.enumType; 
    this.transformedValue = this.enumToStringPipe.transform(enumValue, enumType);
  }

  refresh(): boolean {
    return false;
  }
}
