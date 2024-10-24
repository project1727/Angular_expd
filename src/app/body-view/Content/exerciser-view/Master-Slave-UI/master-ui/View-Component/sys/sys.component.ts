import { Component, EventEmitter, Output } from '@angular/core';
import { SysCreator } from '../../../../../../../structure/SysCreator';
import { MasterUIService } from '../../../../../../../service/master-ui.service';
import { eImgRes } from '../../../../../../../enums/enum';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { SummaryComponent } from '../summary/summary.component';
import { IScript } from '../../../../../../../interfaces/IScript .interface';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-sys',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOption,
    MatSelect,
    FormsModule,
    NgFor,
    SummaryComponent
  ],
  templateUrl: './sys.component.html',
  styleUrls: ['./sys.component.css'],
})
export class SysComponent {
  Sys: SysCreator = new SysCreator();
  ImgReg: string[] = [];
  eimgRes = eImgRes;
  scriptList: IScript[] = [];
  // sysSummaryData: SysCreator = new SysCreator();
  // // Output event to pass sysData to parent or SummaryComponent
  //  @Output() sysDataAdded = new EventEmitter<SysCreator>();

  constructor(private masterUIService: MasterUIService) {
    this.Sys.highTime = 40;
    this.Sys.lowTime = 200;
    this.Sys.resImg = eImgRes.sec;
    this.ImgReg = Object.keys(this.eimgRes).filter((key) => isNaN(Number(key)));
    this.masterUIService.scriptList$.subscribe((scripts) => {
      this.scriptList = scripts;
    });
  }

  onButtonClick() {
    try {
      // Emit the Sys data to the parent or summary component
     // this.sysDataAdded.emit(this.Sys);
    //  this.sysSummaryData = {
    //   ...this.Sys, 
    //   scriptType: this.Sys.scriptType
    // };

      // Optionally add to the service if necessary
      this.masterUIService.addScript(this.Sys);

      this.publishMessage('Sys Configuration added successfully');
    } catch {
      this.publishMessage('Sys Configuration not added');
    }
  }

  publishMessage(message: string) {
    console.log(message);
  }
}
