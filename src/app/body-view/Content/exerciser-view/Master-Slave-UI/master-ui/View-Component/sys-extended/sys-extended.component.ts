import { Component, EventEmitter } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MasterUIService } from '../../../../../../../service/master-ui.service';
import { IScript } from '../../../../../../../interfaces/IScript .interface';
import { SysExtendedCreator } from '../../../../../../../structure/SysExtendedCreator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { eACKCycle, eI2CMode } from '../../../../../../../enums/enum';
import { NgFor } from '@angular/common';
import { SysCreator } from '../../../../../../../structure/SysCreator';

@Component({
  selector: 'app-sys-extended',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOption,
    MatSelect,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgFor
  ],
  templateUrl: './sys-extended.component.html',
  styleUrl: './sys-extended.component.css'
})

//@Output() sysDataAdded = new EventEmitter<SysCreator>();
export class SysExtendedComponent {

  SysExtended: SysExtendedCreator=new SysExtendedCreator();
  ackcycle: string[] = [];
  EaCKCycle=eACKCycle;
  I2CMode: string[] = [];
  EI2CMode=eI2CMode;
  scriptList: IScript[] = [];


constructor(private masterUIService: MasterUIService)
{
  this.masterUIService.scriptList$.subscribe((scripts) => {
    this.scriptList = scripts;
  });

  this.ackcycle = Object.keys(this.EaCKCycle).filter((key) => isNaN(Number(key)));
  this.I2CMode = Object.keys(this.EI2CMode).filter((key) => isNaN(Number(key)));
}



onButtonClick() {
  try {
   
    // this.SysExtended.tSU_STA = this.SysExtended.tSU_STA;
    // this.SysExtended.tSU_STO =this.SysExtended.tSU_STO;
    // this.SysExtended.tSU_DAT = this.SysExtended.tSU_DAT;
    // this.SysExtended.IBIAbortCount =  this.SysExtended.IBIAbortCount;
    // this.SysExtended.ACKCycle = this.SysExtended.ACKCycle;
    // this.SysExtended.I2CMode=this.SysExtended.I2CMode;


    //console.log(this.pointer);
  
    this.masterUIService.addScript(this.SysExtended);
    console.log(this.masterUIService);

    //this.publishMessage('Sys Configuration added successfully');
  } catch {
   // this.publishMessage('Sys Configuration not added');
  }
}

}
