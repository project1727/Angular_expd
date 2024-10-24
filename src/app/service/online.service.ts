import { Injectable } from '@angular/core';
import { CommonService } from './commonType.service';
import { ProtoService } from './proto.service';
import { DeviceInfo } from '../../../.generated/protos/CommonTypes';
import {  IpcRenderer } from 'electron';
import { delay } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  constructor(private commonService: CommonService, private protoService: ProtoService) {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.setCaptureAppName();
    }
   }
   captureAppName: string = ``;
  captureAppPath = ''; 
  appServerAddress = ''; 
  userName:string = "EXPDLive";
  private ipcRenderer: IpcRenderer |undefined;


  isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
  private async setCaptureAppName() {
    if (this.ipcRenderer) {
      const processId = await this.ipcRenderer.invoke('get-process-id');
      this.captureAppName = `CaptureApp_${processId}`;
      console.log('Capture App Name:', this.captureAppName);
     
    }
  }

  async sendSetupSystemMessageLive(){
    const userName = this.userName; 
    const useCompression = false; 
    const rawDataProcessorConcurrency = 1; 
    const waveformProcessorConcurrency = 1; 
    const edgeProcessorConcurrency = 1; 
    const captureAppName= this.captureAppName;
 //alert("captureAppName"+ captureAppName);
    //delay(500);
    const messageWrapper = this.commonService.createSetupSystemMessage(
      userName,
      useCompression,
      rawDataProcessorConcurrency,
      waveformProcessorConcurrency,
      edgeProcessorConcurrency,
      captureAppName
    );

    await this.protoService.sendMessage(messageWrapper);
  }

  async launchCaptureApp() {
    if (this.ipcRenderer) {
      try {
     
      const result = await this.ipcRenderer.invoke('launch-capture-app', '', '', this.captureAppName);
    
      if (result.error) {
        console.error('Failed to launch capture app:', result.error);
      } else {
        console.log('Capture app launched successfully:', result.output);
      }
    } catch (error) {
      console.error('Error during app launch:', error);
   }
  }
  }
  
  async sendSetupDeviceSystemMessage() {
    try {
      
      const deviceList: DeviceInfo[] = await this.protoService.requestDeviceList();
    // alert(deviceList); 
     
      await this.protoService.setupDevice(this.userName, deviceList);
  
    // alert('Device setup successfully');
    } catch (error) {
      alert('Error in setting up device system');
    }
  }
  
  
  async sendInitializeRunMessage() {
    const userName = this.userName; 
    const runId = 1; 
    const live=true;

  

    const runConfiguration = this.commonService.createRunConfigurationLive();
  console.log(runConfiguration);
    const messageWrapper = this.commonService.createInitializeRunLiveMessage(
      userName,
      runId,
      runConfiguration,
      live
    );
    console.log(messageWrapper);
    await this.protoService.sendMessage(messageWrapper);

  }




  async startrun() {

    const runId = 1; 

const messageWrapper=this.commonService.createStartRunMessage(runId);;

await this.protoService.sendMessage(messageWrapper);

}




async stoprun(): Promise<void> {
const runId = 1; 

const messageWrapper=this.commonService.createStopRunMessage(runId);;

await this.protoService.sendMessage(messageWrapper);

}


async publishModifiedScript(nodeBytes: Uint8Array[]) {

alert("Sending packets..");
  await this.protoService.sendExpdConfiguration(nodeBytes);
}




}
