import { Injectable } from '@angular/core';
import { CommonService } from './commonType.service';
import { ProtoService } from './proto.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  constructor(private commonService: CommonService, private protoService: ProtoService) { }




  async sendSetupSystemMessage(){
    const userName = 'EXPD'; 
    const useCompression = false; 
    const rawDataProcessorConcurrency = 1; 
    const waveformProcessorConcurrency = 4; 
    const edgeProcessorConcurrency = 4; 
    const captureAppName="";
    const messageWrapper = this.commonService.createSetupSystemMessage(
      userName,
 
      useCompression,
      rawDataProcessorConcurrency,
      waveformProcessorConcurrency,
      edgeProcessorConcurrency,
      captureAppName,
    );

    await this.protoService.sendMessage(messageWrapper);
  }

  async sendInitializeRunMessage(offlineFilePath: string) {
    const userName = 'EXPD'; 
    const runId = 1; 
   const live=false;

  

    const runConfiguration = this.commonService.createRunConfiguration();
  
    const messageWrapper = this.commonService.createInitializeRunMessage(
      userName,
      offlineFilePath,
      runId,
      runConfiguration,
      live
    );

    await this.protoService.sendMessage(messageWrapper);

  }


  
  async startrun(): Promise<void> {

          const runId = 1; 

      const messageWrapper=this.commonService.createStartRunMessage(runId);;

      await this.protoService.sendMessage(messageWrapper);

}
}
