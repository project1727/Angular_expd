import { ChangeDetectionStrategy,Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NodeStructure } from '../../../../../structure/nodeStructure';
import { eDCR, eDCRDescription, eNodeType } from '../../../../../enums/enum';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
// import PubSub, { name } from 'pubsub-js';
//import { DefaultPubsubService, PubsubService } from '../../../../../service/pubsub.service';
import { MIPIMember, ProtocolInfoRepositoryService } from '../../../../../service/protocol-info-repository.service';


@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
     NgFor,
    MatDialogModule,
    FormsModule,
    NgIf,
    
  ],
 
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css',

})
export class RegistersComponent implements OnInit {
  @Output() dataToParent = new EventEmitter<number>();



  enodeType=eNodeType;
  selectedSDR: string = 'SDR Only';
  selectBridgeID: string = 'No';
  offlineCap: string = 'Always respond';
  ibiPayload: string = 'No data';
  ibiRequest: string = 'Not Capable';
  maxSpeed: string = 'No Limitation';
  //Manfacturer: string="MIPI";
  //Manfacturerer: string="Prodigy Tecnovations PVt.";
  //DCRTypeVALUE:string="key";
  nodeDetail:NodeStructure; 
  //  Type: string="Vendor";
  selectedDCR= eDCR.Generic; 
  isOnUpdateBCR: boolean = false;
  isOnUpdatePID: boolean = false;
  lblRole:string='';
  DCRType:string[]=[];
  DCRTypeList=eDCR;
  BCRValue: number = 0;
  // private BCRSubscription: any;
  mipiMembers: MIPIMember[] = [];
 
  // cmbMID: string[] = [];
  // mfgTypeList: string[] = ['MIPI', 'Custom'];
  // pidTypeList: string[] = ['Vendor', 'Random'];
  // selectedMID: number = 261;
  // mfgType: string = 'MIPI';
  // txtMID: string = '2AC';
  // partID: string = '0';
  // instanceID: string = '0';
  // vendorDef: string = '0';
  // randomVal: string = '0';
  // pidType: string = 'Vendor';
  // isMIDHidden: boolean = true;
  pidValue: number = 0;
  cmbMID: string[] = [];
  cmbType: string[] = ["Vendor", "Random"];
  cmbMfgType: string[] = ["MIPI", "Custom"];
  selectedMID: string = '261';
  selectedType: string = 'Vendor';
  selectedMfgType: string = 'MIPI';
  txtMID: string = "2AC";
  txtPartID: string = "0";
  txtInstance: string = "0";
  txtVendorDef: string = "0";
  txtRandom: string = "0";
  // visibilityMID: boolean = false;
  // visibilityRandom: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegistersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private protocolInfoService: ProtocolInfoRepositoryService
  ) {
 
    this.nodeDetail=data;
   
    //this.BCRValue = this.nodeDetail.nodeType !== eNodeType.Master ? (data._BCR & 0x3F) : (data._BCR & 0x3F | 0x40);
    //this.onBCRValueChange(this.BCRValue);
    this.BCRValue=data.BCR;
    this.selectedDCR = data._DCR==0 ? "Generic" : data._DCR;
    this.pidValue=data._PID;  
    //console.log(this.pidValue);
  }

  
  
   ngOnInit() {
    this.DCRType = Object.keys(this.DCRTypeList).filter(key => isNaN(Number(key)));  
    this.updateControlValuesBCR();
    this.initialize();
   }
 
 
   initialize(): void {
  
    this.protocolInfoService.getMemberInfo().subscribe((members) => {
      this.mipiMembers = members;
      this.cmbMID = members.map((obj) => obj.name);
      this.updateControlValuesPID();
     // alert("entered ................");
    });
  
    //console.log("midlist "+ this.midList);
    this.updateControlValuesBCR();
  }
   // Method to emit DCR changes to the parent
 onDCRChange(valueDCR: eDCR ) {
  this.nodeDetail.DCR = valueDCR;
  this.data.DCR=valueDCR;
  // console.log("DCR Changing"+newValue);
  this.dataToParent.emit(this.data);
}


   // Method to handle changes to BCRValue
   onBCRValueChange(valueBCR: number) {
    this.nodeDetail.BCR=valueBCR;
     this.data.BCR=valueBCR;
    this.dataToParent.emit(this.data);

  }
 // Method to handle changes to PIDValue
  onPIDValueChannge(valueDCR:number)
  {
    this.nodeDetail.PID=valueDCR;
    this.data.PID=valueDCR;
   this.dataToParent.emit(this.data);
  // console.log(this.data.PID);
  }
 

  onCancel(event: Event): void {
    event.preventDefault();  // Prevent default event action
    console.log('Cancel button clicked. Dialog will not close.');

  }

  // Close the dialog explicitly with Ok button
  confirm(): void {
    this.dialogRef.close(this.data); 
  }

   /* #region BCR */
 
  updateControlValuesBCR() {
    if (!this.isOnUpdateBCR) {
    
      switch (this.BCRValue >> 6) {
       
        case 0:
          this.lblRole = "I3C Slave";
 
          break;
        case 1:
          this.lblRole = "I3C Master";
          break;
     
      }
   
      this.selectedSDR = ((this.BCRValue >> 5) & 1)==1 ? 'HDR Capable' : 'SDR Only';
      this.selectBridgeID = ((this.BCRValue >> 4) & 1)==1 ? 'Yes' : 'No';
      this.offlineCap =((this.BCRValue >> 3) & 1)==1 ? 'Not always respond' : 'Always res';
      this.ibiPayload =( (this.BCRValue >> 2) & 1)==1 ? 'One or more data':'No data';
      
      this.ibiRequest =( (this.BCRValue >> 1) & 1)==1 ? 'Capable' : 'Not Capable';
      this.maxSpeed = ((this.BCRValue & 1) ==1)?  'Limitation':'No Limitation';
    }
  }

  onSelectedSDRChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xDF;
    if (this.selectedSDR === 'HDR Capable') {
      this.BCRValue |= 0x20;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }

  onSelectBridgeIDChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xEF;
    if (this.selectBridgeID === 'Yes') {
      this.BCRValue |= 0x10;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }

  onOfflineCapChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xF7;
    if (this.offlineCap === 'Not always respond') {
      this.BCRValue |= 0x8;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }

  onIbiPayloadChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xFB;
    if (this.ibiPayload === 'One or more data') {
      this.BCRValue |= 0x4;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }

  onIbiRequestChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xFD;
    if (this.ibiRequest === 'Capable') {
      this.BCRValue |= 0x2;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }

  onMaxSpeedChange() {
    this.isOnUpdateBCR = true;
    this.BCRValue &= 0xFE;
    if (this.maxSpeed === 'Limitation') {
      this.BCRValue |= 0x1;
    }
    this.isOnUpdateBCR = false;
    this.onBCRValueChange(this.BCRValue); 
  }
  /* #endregion */



    /* #region PID */

updateControlValuesPID() {
  if (!this.isOnUpdatePID) {
    try {
      this.selectedMfgType = 'MIPI';
     // console.log(this.pidValue);

      // Using BigInt for PIDValue
      let PIDValue = BigInt(this.pidValue);

      // Extract mfgType and mfg values using BigInt
      let mfgType = Number((PIDValue >> BigInt(48)) & BigInt(0x1));
      let mfg = Number((PIDValue >> BigInt(33)) & BigInt(0x7FFF));

      //console.log("mfgType:", mfgType); 
      //console.log("mfg:", mfg);         

      this.protocolInfoService.getMemberInfo().subscribe((members) => {
        if (mfgType === 0) {
         
          this.selectedMID = members.find(obj => obj.id === mfg)?.name || '';
          //console.log(this.selectedMID);
        } else {
          this.selectedMfgType = 'Custom';
        
          this.txtMID = mfg.toString(16).toUpperCase();
        }

        const type = (this.pidValue >> 32) & 0x1;

        if (type === 0) {
          this.selectedType = "Vendor";
      
          this.txtRandom = "0";
          this.txtPartID = ((this.pidValue >> 16) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
        //  console.log( this.txtPartID);
          this.txtInstance = ((this.pidValue >> 12) & 0xF).toString(16).toUpperCase();
          // console.log( this.txtInstance);
          this.txtVendorDef = (this.pidValue & 0xFFF).toString(16).toUpperCase().padStart(3, '0');
          // console.log( this.txtVendorDef);
        } else {
          this.selectedType = "Random";
        
          this.txtPartID = '0';
          this.txtInstance = '0';
          this.txtVendorDef = '0';
          this.txtRandom = (this.pidValue & 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0');
        }
      });
   //   this.onPIDValueChannge(this.pidValue); 
    } catch (error) {
      console.error("Error updating control values:", error);
    }
  }
}


  onTypeChange(): void {
    alert("0o");
    this.isOnUpdatePID = true;
    this.pidValue &= 0xFFFE00000000;
    if (this.selectedType === "Random") {
      this.pidValue |= 0x100000000;
      //this.visibilityRandom = true;
    } else {
     // this.visibilityRandom = false;
    }
    this.txtRandom = '0';
    this.txtPartID = '0';
    this.txtInstance = '0';
    this.txtVendorDef = '0';
  
    this.isOnUpdatePID = false;
    this.onPIDValueChannge(this.pidValue); 
  }

  onMIDChange(): void {
    this.isOnUpdatePID = true;
    
    if (this.selectedMfgType === "MIPI") {
      this.protocolInfoService.getMemberInfo().subscribe(members => {
        const memberInfo = members.find(obj => obj.name === this.selectedMID);
        if (memberInfo) {
          this.pidValue &= 0x00001FFFFFFFF;
          this.pidValue |= (memberInfo.id & 0x7FFF) << 33;
        }
      });
    }
    
    this.isOnUpdatePID = false;
    this.onPIDValueChannge(this.pidValue); 
  }
  
  onMfgTypeChange( ):void {
    this.isOnUpdatePID = true;

    let pidValueBigInt = BigInt(this.pidValue);
    pidValueBigInt &= BigInt(0x00001FFFFFFFF);
  
    if (this.selectedMfgType === 'MIPI') {
      this.protocolInfoService.getMemberInfo().subscribe(members => {
      
       const memberInfo = members.find(obj => obj.name === this.selectedMID); 
       pidValueBigInt &=BigInt(0x10001FFFFFFFF);
      
      if(memberInfo){
       pidValueBigInt |= (BigInt((memberInfo.id & 0x7FFF)))<< BigInt(33);
     
      }
      });
  
    } 
    else
     {
      pidValueBigInt |=BigInt( 0x1000000000000);
      this.txtMID = '0';
 }
    this.pidValue = Number(pidValueBigInt);
    this.isOnUpdatePID = false;
    this.onPIDValueChannge(this.pidValue); 
  }



  txtMID_LostFocus(): void {
    if (this.selectedMfgType === "Custom") {
      this.isOnUpdatePID = true;
      this.pidValue &= 0x0001FFFFFFFF;
      const midVal = parseInt(this.txtMID, 16);
      if (!isNaN(midVal)) {
        this.pidValue |= (midVal & 0x7FFF) << 33;
      } else {
        this.txtMID = "0";
      }
      this.isOnUpdatePID = false;
    }
    this.onPIDValueChannge(this.pidValue); 
  }

txtPartID_LostFocus(event: FocusEvent) {
  this.isOnUpdatePID = true;
  if (this.selectedType === 'Vendor') {
    const partID = parseInt(this.txtPartID, 16);

    if (!isNaN(partID) && partID <= 0xFFFF) {

      let pidValueBigInt = BigInt(this.pidValue);
      pidValueBigInt &= BigInt(0x0FFFF0000FFFF);
      pidValueBigInt |= BigInt(partID) << BigInt(16);
      this.pidValue = Number(pidValueBigInt);
   
    } else {
      this.txtPartID = '0';
    }
  }
  this.isOnUpdatePID = false;

  this.onPIDValueChannge(this.pidValue); 
}


txtInstance_LostFocus(event: FocusEvent) {
  this.isOnUpdatePID = true;
  if (this.selectedType === 'Vendor') {
    const instanceID = parseInt(this.txtInstance, 16);
    if (!isNaN(instanceID) && instanceID <= 0xF) 
      {
      let InstanceValueBigInt = BigInt(this.pidValue);
      InstanceValueBigInt &=BigInt( 0x0FFFFFFFF0FFF);
      InstanceValueBigInt |= BigInt(instanceID << 12);
      this.pidValue = Number(InstanceValueBigInt);
      //console.log(this.pidValue);
    } 
    else 
    {
      this.txtInstance = '0';
    }
  }
  this.isOnUpdatePID = false;
  this.onPIDValueChannge(this.pidValue); 
}


txtVendorDef_LostFocus(event: FocusEvent) {
  this.isOnUpdatePID = true;
  if (this.selectedType === 'Vendor') {
    const vendorDef = parseInt(this.txtVendorDef, 16);
    if (!isNaN(vendorDef) && vendorDef <= 0xFFF) 
      {
      let VendorDefValueBigInt = BigInt(this.pidValue);
      VendorDefValueBigInt &=BigInt( 0x0FFFFFFFFF000);
      VendorDefValueBigInt |= BigInt(vendorDef);
      this.pidValue = Number(VendorDefValueBigInt);
      //console.log(this.pidValue);

    } else {
      this.txtVendorDef = '0';
    }
  }
  this.isOnUpdatePID = false;
  this.onPIDValueChannge(this.pidValue); 
}


txtRandom_LostFocus(event :FocusEvent) {
  this.isOnUpdatePID = true;
  if (this.selectedType === 'Random') {
    let randomVal = parseInt(this.txtRandom, 16);
    this.pidValue &= 0x0FFFF00000000;
    if (!isNaN(randomVal) && randomVal <= 0xFFFFFFFF) {
      this.pidValue |= randomVal;
    } else {
     
      this.txtRandom = '0';
    }
  }
  this.isOnUpdatePID = false;
  this.onPIDValueChannge(this.pidValue); 
}

  /* #endregion */
}