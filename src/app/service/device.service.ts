import { Injectable } from '@angular/core';

import { eDeviceType, eNodeType, eResponseFlag, I2CAddressList, I3CAddressList } from '../enums/enum';
import { NodeStructure } from '../structure/nodeStructure';
import { OnlineService } from './online.service';
import { HardwareFactoryConverterService } from './HardwareFactoryConverter.service';
import { SessionConfiguration } from '../structure/sessionConfiguration';
import { ProtocolInfoRepositoryService } from './protocol-info-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private slaveNodeList: NodeStructure[] = [];
  private masterNodeList: NodeStructure[] = [];
  private currentMaster: number = 0xFF;

  constructor(private onlineService:OnlineService,
    private hardwareFactoryConverterService: HardwareFactoryConverterService,
    private protocolInfoRepositoryService:ProtocolInfoRepositoryService) { }




  
  addDeviceMethod(node: NodeStructure): eResponseFlag{
    let nodeId = 0;
  //  if (SessionConfiguration.ConnectionStatus){

    
   let pid=BigInt(node.PID);
   node.PID= Number(pid & BigInt(0xFFFFFFFFFFFF));
  //  console.log(node.PID);
    if (this.conflictExists(node)) {
      return eResponseFlag.Device_Err_Conflict;
    }

    switch (node.nodeType) {
      case eNodeType.Master:
        return this.addMasterDevice(node, nodeId);
      case eNodeType.I3C_Slave:
      case eNodeType.I2C_Slave:
      case eNodeType.Sec_Master:
        return this.addSlaveDevice(node, nodeId);
      default:
        return eResponseFlag.Invalid_Data;
    }
  //}
      //   else
      // {
      //     nodeId = 0;
      //     return eResponseFlag.Connection_Fail;
      // }
  }

  private conflictExists(node: NodeStructure): boolean {
    return this.slaveNodeList.some(obj => 
      (obj.staticAddress === node.staticAddress
         && node.nodeType !== eNodeType.Master) ||
      (!(node.nodeType === eNodeType.I2C_Slave)
       && obj.PID === node.PID && obj.nodeType !== eNodeType.I2C_Slave)) ||
      this.masterNodeList.some(obj => obj.PID === node.PID 
        && !(node.nodeType === eNodeType.I2C_Slave));
  }

  private addMasterDevice(nodeDetail: NodeStructure, nodeId: number): eResponseFlag {
    if (this.masterNodeList.length === 0) {
      if (nodeDetail.deviceType === eDeviceType.Internal) 
        {
          nodeDetail.nodeId = 0;
          this.currentMaster = 0;
      }
       else 
       {
        nodeDetail.nodeId = 8;
        nodeId = 8;
        this.currentMaster = 8;
      }
      this.masterNodeList.push(new NodeStructure(nodeDetail));
      const nodeBytes: Uint8Array[] = [this.hardwareFactoryConverterService.getAddNodeBytes(nodeDetail)];
      this.onlineService.publishModifiedScript(nodeBytes);
      return eResponseFlag.Success;
    } else {
      return eResponseFlag.Device_Err_Max;
    }
  }

  private addSlaveDevice(nodeDetail: NodeStructure, nodeId: number): eResponseFlag {
    if (this.slaveNodeList.length >= 11) {
        return eResponseFlag.Device_Err_Max;
    }

    // Internal or External node logic
    if (nodeDetail.deviceType === eDeviceType.Internal) {
        const internalNodes = this.slaveNodeList.filter(x => x.deviceType === eDeviceType.Internal).length;
        if (internalNodes >= 3) {
            return eResponseFlag.Device_Err_Max;
        }
    }

    // Assign a node ID and add the node
    nodeDetail.nodeId = this.getAvailableNodeId(nodeDetail);
    this.slaveNodeList.push(new NodeStructure(nodeDetail));
    const nodeBytes: Uint8Array[] = [this.hardwareFactoryConverterService.getAddNodeBytes(nodeDetail)];
    this.onlineService.publishModifiedScript(nodeBytes);

    // Handle I2C and I3C address registration
    if (nodeDetail.nodeType === eNodeType.I2C_Slave) {
        const val = this.protocolInfoRepositoryService.getI2CAddress(nodeDetail.staticAddress);
        if (!I2CAddressList.includes(val)) {
            I2CAddressList.push(val);
        }
    }

    if (nodeDetail.nodeType === eNodeType.I3C_Slave) {
        const returnAddress = parseInt(nodeDetail.staticAddress, 16);
        if (!isNaN(returnAddress) && !I3CAddressList.hasOwnProperty(returnAddress)) {
            I3CAddressList[returnAddress] = nodeDetail.DCR;
        }
    }

    return eResponseFlag.Success;
}

  private getAvailableNodeId(node: NodeStructure): number {
    let nodeCount: number | undefined;
  
    if (node.deviceType === eDeviceType.Internal) {
      const nodeInternalIds = this.slaveNodeList.filter(x => x.deviceType === eDeviceType.Internal).map(n => n.nodeId);
      const possibleIds = [1, 2, 3, 4];
      nodeCount = possibleIds.find(id => !nodeInternalIds.includes(id));
    } else {
      const nodeExternalIds = this.slaveNodeList.filter(x => x.deviceType === eDeviceType.External).map(n => n.nodeId);
      const possibleIds = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      nodeCount = possibleIds.find(id => !nodeExternalIds.includes(id));
    }
  

    return nodeCount ?? -1;
  }
  


  // private getAddNodeBytes(node: NodeStructure): Uint8Array {
  //   const byteList: number[] = [];
  //   byteList.push(17); // Example packet construction
  //   // Add additional logic similar to the C# implementation
  
  //   // Convert number[] to Uint8Array
  //   return new Uint8Array(byteList);
  // }
}
