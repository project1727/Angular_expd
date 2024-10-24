import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { eBroadcastCCC, eDirectedCCC, eFrameType, eMessageType, eTransferType, TransferType } from '../../../../../../../enums/enum';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ProtocolInfoRepositoryService } from '../../../../../../../service/protocol-info-repository.service';
import { MasterMessageCreator } from '../../../../../../../structure/MasterMessageCreator ';
import { IScript } from '../../../../../../../interfaces/IScript .interface';
import { MasterUIService } from '../../../../../../../service/master-ui.service';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOption,
    MatSelect,
    MatCheckbox,
    NgFor,
    FormsModule,
    NgIf
  ],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css'
})
export class BusComponent {
  MessageType: string[] = [];
  eMsgType = eMessageType;
  BroadcastCCC: string[] = [];
  EBroadcastCCC=eBroadcastCCC;
  DirectedCCC: string[] = [];
  EDirectedCCC=eDirectedCCC;
  TransferTypes: string[] = [];
  TransferType=TransferType;
  selectedCommand: eBroadcastCCC | eDirectedCCC | null = null;
  selectedMessageType:string="BroadCast";
  selectedBroadCastCCC:number=0;
  selectedDirectedCastCCC:string="ENEC";
  selectedTransferType:string="Write";
  commandHasData:boolean=false;
  txtData:string="";
  txtDCount:string="";
  chkStop:boolean=false;
  chkCP:boolean=false;
  chkDP:boolean=false;
  scriptList: IScript[] = [];

  constructor(private protocolInfoRepositoryService: ProtocolInfoRepositoryService,private masterUIService: MasterUIService){
    this.MessageType = Object.keys(this.eMsgType).filter((key) => isNaN(Number(key)));
    this.BroadcastCCC = Object.keys(this.EBroadcastCCC).filter((key) => isNaN(Number(key)));
    this.DirectedCCC = Object.keys(this.EDirectedCCC).filter((key) => isNaN(Number(key)));
    this.TransferTypes = Object.keys(this.TransferType).filter((key) => isNaN(Number(key)));
    this.masterUIService.scriptList$.subscribe((scripts) => {
      this.scriptList = scripts;
    });
  
  }


  // public CommandSelectedChanged() {
  //   if (this.selectedMessageType === "BroadCast") {
  //     switch (this.selectedBroadCastCCC.toString()) {
  //       case eBroadcastCCC[eBroadcastCCC.ENTDAA]: 
  //         // Do something for ENTDAA
  //         break;
  
  //       case eBroadcastCCC[eBroadcastCCC.ENTHDR0]:  
  //         // Do something for ENTHDR0
  //         break;
  
  //       // Add other cases for eBroadcastCCC as needed
  //       default:

  //       if (ProtocolInfoRepository.GetCommandInfo((int)((eBroadcastCCC)cmbCommand.SelectedItem)).HasData)
  //         break;
  //     }
  //   }
  // }
  

  cmbCommandSelectionChanged() {
    // console.log("L1");
    // if (this.selectedBroadCastCCC !== null) {

    //   console.log(this.selectedBroadCastCCC);
  
    //     if (this.selectedMessageType === 'BroadCast') {
    //     switch (this.selectedBroadCastCCC.toString() ) {
    //       case eBroadcastCCC[eBroadcastCCC.ENTDAA]:
         
    //       break;

    //       case eBroadcastCCC[eBroadcastCCC.ENTHDR0]:
    //       case eBroadcastCCC[eBroadcastCCC.ENTHDR1]:
    //       case eBroadcastCCC[eBroadcastCCC.ENTHDR2]:
     

    //       default:
       
    //         const commandInfo = this.protocolInfoRepositoryService.getCommandInfo(this.selectedMessageType);
    //         console.log(commandInfo);
    //         if (commandInfo.HasData) {
    //           console.log(commandInfo.HasData);
    //           if (commandInfo.TransferType === eTransferType.Write) {

    //            this. commandHasData=true;
    //           } else {
          
    //           }
    //           } else {
   
    //           }
    //           break;
    //     }
    //   } 
    //   else if (this.selectedMessageType === 'Directed') {
    //     const commandInfo = this.protocolInfoRepositoryService.getCommandInfo(this.selectedCommand as eDirectedCCC);
    //     if (commandInfo.HasData) {
    //       if (commandInfo.hasMultiplePattern) {
        
    //       } else {
    //         if (commandInfo.TransferType === eTransferType.Write) {
         
    //         } else {
       
    //         }
    //       }
    //     } else {
  
    //     }
    //   }
    // }
  }
  














  ItemSource: any[] = []; // Assuming this will hold your messages
  onButtonClick() {
  //  this.ItemSource.clear(); // Clear previous messages
    try {
      if (this.selectedMessageType === 'BroadCast') {
        const brdCast = new MasterMessageCreator();
        brdCast.frameType = eFrameType.BROADCAST;
        brdCast.addressEnable = false;
        brdCast.command = this.selectedBroadCastCCC;

        // if ([0x20, 0x21, 0x22].includes(brdCast.command)) {
        //   if (!this.HDRCommands.some(obj => obj.transferType === eTransferType.Write && obj.data == null)) {
        //     for (const item of this.HDRCommands) {
        //       item.CCC = brdCast.command;
        //       this.ItemSource.push(new DDRMessageCreator(item));
        //     }
        //     this.publishMessage('DDR Message added successfully');
        //   } else {
        //     this.publishMessage('Incorrect value in DDR');
        //   }
        // } else {
          // Handle the command info for broadcasting
          const commandInfo = this.protocolInfoRepositoryService.getCommandInfo(brdCast.command);
          if (commandInfo.HasData) {
            if (commandInfo.TransferType === eTransferType.Write) {
              brdCast.transferType = eTransferType.Write;
              brdCast.data = this.txtData.split('-').map(obj => parseInt(obj, 16));
            } else {
              brdCast.transferType = eTransferType.Read;
              brdCast.dataCount = parseInt(this.txtDCount);
            }
          }
          brdCast.hasStop = this.chkStop;
          brdCast.commandParity = this.chkCP;
          brdCast.dataParity = this.chkDP;
        
         // this.ItemSource.push(brdCast);
            this.masterUIService.addScript(brdCast);
          this.publishMessage('Broadcast Message added successfully');
       // }
      // } else if (this.selectedMessageType === 'Directed') {
      //   const dir = new MasterMessageCreator();
      //   dir.frameType = eFrameType.DIRECTED;
      //   dir.addressEnable = false;
      //   dir.command = this.selectedDirectedCCC;

      //   const addr = parseInt(this.txtSlave, 16);
      //   dir.address = addr;

      //   // Add more logic similar to the C# code as necessary...

      //   dir.hasStop = this.chkStop;
      //   dir.commandParity = this.chkCP;
      //   dir.dataParity = this.chkDP;
      //   this.ItemSource.push(dir);
      //   this.publishMessage('Directed Message added successfully');
      // }
      // Implement similar logic for Private and I2C_Message types...
        }
    } 
    catch (error) {
      this.publishMessage('Message not added. Please check the value.');
    }
  }

  publishMessage(message: string) {
    // Your notification logic here
    console.log(message); // For demonstration, replace with your actual notification system
  }

}