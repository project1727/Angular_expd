import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { grpc } from '@improbable-eng/grpc-web';
import { ConnectMessage, ConnectionStatus, MessageWrapper, ResponseMessageWrapper } from '../../../.generated/protos/ProtoService';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Channels, InitializeRunMessage, ProcessConfiguration, ProtocolConfiguration, RunConfiguration, SampleRate, SetupSystemMessage, StartRunMessage, StopRunMessage, TriggerConfiguraiton, TriggerConfiguration, TriggerType } from '../../../.generated/protos/CommonTypes';
import { Any } from '../../../.generated/protos/google/protobuf/any';
// import { channel } from 'diagnostics_channel';
import { Configuration_I3C, SlaveType } from '../../../.generated/protos/I3CFrame';

import { load, Root } from 'protobufjs';
import { channel } from 'diagnostics_channel';
import { eDCR, I2CAddressList, I3CAddressList } from '../enums/enum';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor() {
   
  }

  createSetupSystemMessage(userName: string, useCompression: boolean, rawDataProcessorConcurrency: number, waveformProcessorConcurrency: number, edgeProcessorConcurrency: number,captureAppName:string): MessageWrapper {
    
    const processConfig = ProcessConfiguration.create();

    processConfig.useCompression = useCompression;
    processConfig.rawDataProcessorConcurrency = rawDataProcessorConcurrency;
    processConfig.waveformProcessorConcurrency = waveformProcessorConcurrency;
    processConfig.edgeProcessorConcurrency = edgeProcessorConcurrency;

    const setupSystemMessage = SetupSystemMessage.create();
    setupSystemMessage.userName = userName;
    setupSystemMessage.captureServiceName=captureAppName;
    // setupSystemMessage.setOfflinefilepath(offlineFilePath);
    setupSystemMessage.configuration = processConfig;

    //console.log('setup definition: type name: ${setup.constructor.name}, namespace: ${}');

    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(setupSystemMessage, SetupSystemMessage);

    return messageWrapper;
  }


  createRunConfiguration(): RunConfiguration {
    const runConfiguration = RunConfiguration.create();

      runConfiguration.connectedChannels = [Channels.Ch12, Channels.Ch11,Channels.Ch10,Channels.Ch9,Channels.Ch8];
      const config = Configuration_I3C.create();
      config.id = 1;
      config.channelIndexSCL = Channels.Ch12;
      config.channelIndexSDA = [Channels.Ch11, Channels.Ch10, Channels.Ch9, Channels.Ch8];
   
      const protocolConfiguration = ProtocolConfiguration.create();
      protocolConfiguration.protocolType = 'I3C';
      protocolConfiguration.protocolName = 'I3C__1';
      protocolConfiguration.configuration = Any.pack(config, Configuration_I3C);

   
      runConfiguration.protocolConfigurations = [protocolConfiguration];


    return runConfiguration;
  }

  createInitializeRunMessage(userName: string,offlineFilePath:string, runId: number, runConfiguration: RunConfiguration,live:boolean): MessageWrapper {
    const initializeRunMessage = InitializeRunMessage.create();
    initializeRunMessage.userName = userName;
    initializeRunMessage.runId = runId;
    initializeRunMessage.configuration = runConfiguration;
    initializeRunMessage.dataSource = { oneofKind: 'datFilePath', datFilePath:offlineFilePath };

    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(initializeRunMessage, InitializeRunMessage);

    return messageWrapper;
  }


  createStartRunMessage( runId: number): MessageWrapper {

    const startrunConfig = StartRunMessage.create();
    startrunConfig.runId = runId;

    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(startrunConfig, StartRunMessage);

    return messageWrapper;
   
  }
  createStopRunMessage( runId: number): MessageWrapper {

    const startrunConfig = StopRunMessage.create();
    startrunConfig.runId = runId;

    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(startrunConfig, StartRunMessage);

    return messageWrapper;
   
  }

  createRunConfigurationLive(): RunConfiguration {
    const runConfiguration = RunConfiguration.create();
       
      runConfiguration.connectedChannels = [Channels.Ch12, Channels.Ch11,Channels.Ch10,Channels.Ch9,Channels.Ch8];
      const config = Configuration_I3C.create();
      config.id = 1;
      config.channelIndexSCL = Channels.Ch12;
      config.channelIndexSDA = [Channels.Ch11, Channels.Ch10, Channels.Ch9, Channels.Ch8];
      config.isMCTPEnabled=false;
   
      //Process I3C address list
      for (const [address, dcr] of Object.entries(I3CAddressList)) {
       // console.log("po");
        const key = Number(address);
        const slaveType = dcr === eDCR.MCTP ? SlaveType.SlaveType_MCTP: SlaveType.SlaveType_I3C;
        config.slaveinfo[key] = { staticAddress: key, slaveType: slaveType };
      }
     
        // Process I2C address list
        for (const address of I2CAddressList) {
          config.slaveinfo[address] = { staticAddress: address, slaveType: SlaveType.SlaveType_I2C };
        }
        console.log(config.slaveinfo);

      const protocolConfiguration = ProtocolConfiguration.create();
      protocolConfiguration.protocolType = 'I3C';
      protocolConfiguration.protocolName = 'I3C__1';
      protocolConfiguration.configuration = Any.pack(config, Configuration_I3C);
    
      runConfiguration.selectedSampleRate = SampleRate.SR_125;
     //console.log(  runConfiguration.selectedSampleRate);
      runConfiguration.protocolConfigurations = [protocolConfiguration];

      const  Trigconfig = TriggerConfiguration.create();
      Trigconfig.triggerType=TriggerType.Auto;
     
     
      runConfiguration.triggerConfiguration=Trigconfig;
    return runConfiguration;
  }
  
  createInitializeRunLiveMessage(userName: string, runId: number, runConfiguration: RunConfiguration,live:boolean): MessageWrapper {
    const initializeRunMessage = InitializeRunMessage.create();
    initializeRunMessage.userName = userName;
    initializeRunMessage.runId = runId;
    initializeRunMessage.configuration = runConfiguration;
    initializeRunMessage.dataSource = { oneofKind:'live', live:live };

    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(initializeRunMessage, InitializeRunMessage);
  //  alert(messageWrapper);
    return messageWrapper;
  }

}

