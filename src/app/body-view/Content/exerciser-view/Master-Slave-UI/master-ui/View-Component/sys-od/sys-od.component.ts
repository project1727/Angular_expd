import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { SysCreator } from '../../../../../../../structure/SysCreator';
import { MasterUIService } from '../../../../../../../service/master-ui.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { IScript } from '../../../../../../../interfaces/IScript .interface';

@Component({
  selector: 'app-sys-od',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  
   
  ],
  templateUrl: './sys-od.component.html',
  styleUrl: './sys-od.component.css'
})
export class SysODComponent {
  SysOD: SysCreator = new SysCreator();
  scriptList: IScript[] = [];
  constructor(private masterUIService: MasterUIService)
  {
    this.SysOD.highTime = 40;
    this.SysOD.lowTime = 200;

    this.masterUIService.scriptList$.subscribe((scripts) => {
      this.scriptList = scripts;
    });
  }


  onButtonClick() {
    try {
     
      // this.SysOD.freq = isNaN(this.SysOD.freq) ? 0 : this.SysOD.freq;
      // this.SysOD.highTime = isNaN(this.SysOD.highTime) ? 40 : this.SysOD.highTime;
      // this.SysOD.lowTime = isNaN(this.SysOD.lowTime) ? 200 : this.SysOD.lowTime;
      // this.SysOD.tCAS = isNaN(this.SysOD.tCAS) ? -1 : this.SysOD.tCAS;
      


      //console.log(this.pointer);
    
      this.masterUIService.addScript(this.SysOD);
      console.log(this.masterUIService);

      this.publishMessage('Sys Configuration added successfully');
    } catch {
      this.publishMessage('Sys Configuration not added');
    }
  }

  publishMessage(message: string) {
    console.log(message);
  }
}
