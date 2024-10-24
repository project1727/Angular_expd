import { Component ,NgModule} from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgModel } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { SysODComponent } from "./View-Component/sys-od/sys-od.component";
import { SysExtendedComponent } from "./View-Component/sys-extended/sys-extended.component";

import { SysComponent } from "./View-Component/sys/sys.component";
import { SysCreator } from '../../../../../structure/SysCreator';
import { BodyViewComponent } from "../../../../body-view.component";
import { BusComponent } from "./View-Component/bus/bus.component";
import { SummaryComponent } from "./View-Component/summary/summary.component";
@Component({
  selector: 'app-master-ui',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    SysODComponent,
    SysExtendedComponent,
    SysComponent,
    BodyViewComponent,
    BusComponent,
    SummaryComponent
],
  templateUrl: './master-ui.component.html',
  styleUrl: './master-ui.component.css'
})
export class MasterUIComponent {
   selectedTab:string='Sys';
  //  sysData: SysCreator = new SysCreator(); // Initialize with a default SysCreator instance

  //  onSysDataAdded(data: SysCreator) {
  //    this.sysData = data; // This will never be null
  //    console.log(this.sysData); // Check data
  //  }
 
   // Function to handle tab changes
   onTabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.tab.textLabel;

  }
}