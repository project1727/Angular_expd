import { Component, Input } from '@angular/core';
import { SysCreator } from '../../../../../../../structure/SysCreator';
import { NgIf } from '@angular/common';
import { MasterUIService } from '../../../../../../../service/master-ui.service';
import { IScript } from '../../../../../../../interfaces/IScript .interface';
import { OnlineService } from '../../../../../../../service/online.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

  scriptList: IScript[] = [];
  // @Input() sysData!: SysCreator;
constructor(private masterUIService: MasterUIService,private onlineService: OnlineService){
  this.masterUIService.scriptList$.subscribe((scripts) => {
    this.scriptList = scripts;
  });
}


OnbuttonClick()
{
    const hexArray: number[] = [0x17, 0x00, 0x20, 0x80];


    let uint8Array = new Uint8Array(hexArray);

    const zerosNeeded: number = 8210;

    const zerosArray = new Uint8Array(zerosNeeded);


    const finalArray = new Uint8Array(uint8Array.length + zerosArray.length);
    finalArray.set(uint8Array); 
    finalArray.set(zerosArray, uint8Array.length); 

    console.log(finalArray); 
    console.log(finalArray.length); 

  
    this.onlineService.publishModifiedScript([finalArray]);
}


OnbuttonClick1()
{

    const hexData: number[] = [
        0x12, 0x46, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x88, 0x00, 0x04, 0x14,
        0x00, 0x00, 0x00, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x07, 0x01, 0x09,
        0x03, 0xc0, 0x00, 0x64, 0x64, 0x00, 0x00, 0x00, 0xa0, 0x00, 0x65, 0x04, 0x00, 0x00, 0x00, 0x90,
        0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x80, 0xc0, 0x04, 0x02, 0x00, 0x00, 0x00, 0x80, 0x88, 0x04,
        0x05, 0x00, 0x00, 0x00, 0x80, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x84, 0x00, 0x00, 0x00
    ];

 
    let uint8Array = new Uint8Array(hexData);

    console.log(uint8Array); 
    console.log(uint8Array.length);

 
    this.onlineService.publishModifiedScript([uint8Array]);


    
}

}
