import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistersComponent } from './registers/registers.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  eDCR,
  eDeviceType,
  eNodeType,
  eResponseFlag,
  eSlaveVersionList,
  eTerminationType,
  eTriggerInOut,
  eTriggerType,
} from '../../../../enums/enum';
import { NodeStructure } from '../../../../structure/nodeStructure';
import { DeviceService } from '../../../../service/device.service';
// import PubSub from 'pubsub-js';

@Component({
  selector: 'app-bus-configuration',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    NgIf,
    MatSlideToggleModule,
    NgFor,
    RegistersComponent,
  ],

  templateUrl: './bus-configuration.component.html',
  styleUrl: './bus-configuration.component.css',
})
export class BusConfigurationComponent implements OnInit {
  nodeDetail: NodeStructure = new NodeStructure();

  NodeTypes: string[] = [];
  enodeType = eNodeType;
  DeviceTypes: string[] = [];
  edeviceType = eDeviceType;
  Termination: string[] = [];
  eterminationType = eTerminationType;
  slaveType: string[] = [];
  eslaveType = eSlaveVersionList;
  TriggerMode: string[] = [];
  eTriggerMode = eTriggerInOut;
  constructor(public dialog: MatDialog, private deviceService: DeviceService) {}

  ngOnInit() {
    this.NodeTypes = Object.keys(this.enodeType).filter((key) =>
      isNaN(Number(key))
    );
    this.DeviceTypes = Object.keys(this.edeviceType).filter((key) =>
      isNaN(Number(key))
    );
    this.Termination = Object.keys(this.eterminationType).filter((key) =>
      isNaN(Number(key))
    );
    this.slaveType = Object.keys(this.eslaveType).filter((key) =>
      isNaN(Number(key))
    );
    this.TriggerMode = Object.keys(this.eTriggerMode).filter((key) =>
      isNaN(Number(key))
    );
    this.nodeDetail.BCR =
      this.nodeDetail.nodeType !== eNodeType.Master
        ? this.nodeDetail.BCR & 0x3f
        : (this.nodeDetail.BCR & 0x3f) | 0x40;
    if (this.nodeDetail.nodeType == eNodeType.I3C_Slave)
      this.nodeDetail.staticAddress = '46';

    // this.nodeDetail.PID=
  }

  // receiveData(data:number)
  // {
  //   console.log(data);
  //   this.nodeDetail.BCR=data;
  // }
  // get selectedNodeType(): eNodeType {
  //   return this.nodeDetail.nodeType;
  // }

  // set selectedNodeType(value: eNodeType) {
  //   this.nodeDetail.nodeType = value;
  //   console.log( this.nodeDetail.nodeType);
  // }

  // Method triggered when nodetype changes
  //  onNodeTypeChange(newNodeType: string) {
  //   // Publish the BCR update to subscribers
  //   PubSub.publish('BCR_UPDATED', newNodeType);
  // }

  dialogRef: any;

  openDialog(): void {
    // if(!this.dialogRef){

    this.dialogRef = this.dialog.open(RegistersComponent, {
      // height: "100vh",
      width: '400vh',
      data: this.nodeDetail,

      // panelClass: "mat-dialog-rtl",
      // position: { right: "0", top: "0" },
    });
    //}

    //Subscribe to @Output event for data change during the dialog session dialogRef.componentInstance.dataToParent.subscribe((data: string) => { this.receivedData = data; // Update the parent as the data changes });
    this.dialogRef.componentInstance.dataToParent.subscribe((data: any) => {
      this.nodeDetail = data;
      //  console.log("pid"+data._PID);
    });
  }

  addDevice() {
    console.log(this.nodeDetail);
    const response = this.deviceService.addDeviceMethod(this.nodeDetail);

    let displayMessage = '';

    switch (response) {
      case eResponseFlag.Success:
        displayMessage = `Device added successfully with Node ID #${this.nodeDetail.nodeId}`;
        this.nodeDetail = new NodeStructure(); // Reset node details
        break;
      case eResponseFlag.Device_Err_Conflict:
        displayMessage = 'Static Address/PID should be unique';
        break;
      case eResponseFlag.Connection_Fail:
        displayMessage = 'Please ensure connection establishment';
        break;
      case eResponseFlag.Device_Err_Max:
        displayMessage = 'Reached maximum device limit';
        break;
      default:
        displayMessage = 'Device not added';
        break;
    }

    console.log(displayMessage);
  }
}
