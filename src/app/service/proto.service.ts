import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ConnectMessage, ConnectionStatus, MessageWrapper, ResponseMessageWrapper } from '../../../.generated/protos/ProtoService';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { DeviceInfo, IndexBasedDataSubset, SetupDeviceMessage, SystemStates, SystemStatusUpdate } from '../../../.generated/protos/CommonTypes';
import { switchMap, retryWhen, delay, tap, catchError } from 'rxjs/operators';
import * as protobuf from 'protobufjs';
import { __values } from 'tslib';
import { MessagesAvailableResponse, MessagesResponse, ProtocolFrame, RequestMessages } from '../../../.generated/protos/DecoderTypes';
import { Any } from '../../../.generated/protos/google/protobuf/any';

import{DeviceListResponse, DeviceSession, DeviceSessionRequest, DeviceStatusResponse, ExerciserData, GetDeviceListMessage, SessionType, SessionWriteMessage, SessionWriteStatus } from '../../../.generated/protos/CaptureService'
import * as I3CFrame from "../../../.generated/protos/I3CFrame"
import * as MCTPFrame from "../../../.generated/protos/MCTPFrame"
import * as protoservice from "../../../.generated/protos/ProtoService.client"
import { grpc } from '@improbable-eng/grpc-web';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { RpcError } from 'grpc-web';
import {  AddressFrame, ExtendedFrame_I3C, PacketI3C,ProtoFrame,CommandFrame ,DataFrame,HDRFrame,StartFrame,StopFrame} from '../interfaces/IFrame.interface';
import { SessionConfiguration } from '../structure/sessionConfiguration';
import { eBoard } from '../enums/enum';

@Injectable({
  providedIn: 'root'
})
export class ProtoService {
  private client: protoservice.ProtoServiceClient;
  private statusSubject = new BehaviorSubject<SystemStatusUpdate | null>(null);
  public status$ = this.statusSubject.asObservable();
  private messagesAvailableSubject = new BehaviorSubject<MessagesAvailableResponse>({ protocolName: "", totalMessages: 0n });
  public messagesAvailable$ = this.messagesAvailableSubject.asObservable();
 
  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: 'http://localhost:5000'
      });

    this.client = new protoservice.ProtoServiceClient(transport); // Replace with your Envoy address
 
  }

  async connect(connectMessage: ConnectMessage): Promise<ConnectionStatus> {
    return this.client.connect(connectMessage).then(async response =>  await response.response);
  
  
  }

  async disconnect(): Promise<void> {
    await this.client.disconnect(new Empty());
  }

  async sendMessage(messageWrapper: MessageWrapper): Promise<void> {
    await this.client.sendMessage(messageWrapper);
  }

  async request(messageWrapper: MessageWrapper): Promise<ResponseMessageWrapper> {
    var call = this.client.sendMessage(messageWrapper);
    return await call.response;
  }

  

  // requestEventStream(): Observable<MessageWrapper> {
  //   return new Observable(observer => {
  //     const stream = this.client.requestEventStream(new Empty());
  //     stream.on('data', (response: MessageWrapper) => {
  //       observer.next(response);
  //     });
  //     stream.on('end', () => {
  //       observer.complete();
  //     });
  //     // stream.on('error', err => {
  //     //   observer.error(err);
  //     // });
  //   });
  // }

  // requestEvent(): Observable<MessageWrapper> {
  //   return new Observable(observer => {
  //     this.client.requestEvent(new Empty(), null, (err, response) => {
  //       if (err) {
  //         observer.error(err);
  //       } else {
  //         observer.next(response);
  //         observer.complete();
  //       }
  //     });
  //   });
  // }
  requestEvent(): Promise<MessageWrapper> {
    return this.client.requestEvent(new Empty()).response;
  }

  async startListeningToEvents_stream() {
    //console.log('yes entered');
    const request = new Empty();
    const call = this.client.requestEventStream(request);
   // console.log('L0');
    call.responses.onMessage((response: MessageWrapper) => {
      //console.log("Received message:", response.message);
      const statusUpdate = Any.unpack(response.message!, SystemStatusUpdate);
      if (statusUpdate) {
        this.statusSubject.next(statusUpdate);
      }
     // console.log('L1');
    });

    call.responses.onError(err =>{
      console.error('Stream error:', err);
    })

    call.responses.onComplete(() => {
      console.log('Stream ended');
    });
  }

  // startListeningToEvent_statusUpdate() {
  //   const request = new Empty();

  //   const eventLoop = () => {
  //     delay(100);
  //     return new Observable<MessageWrapper>(observer => {
  //       const handleEvent = async () => {
  //         try {
  //           const response = await this.requestEvent(request).toPromise();
  //           if (response && response.getMessage()) {              
  //             if(response.getMessage()?.getTypeUrl() == "type.googleapis.com/CommonTypes.SystemStatusUpdate") {
  //               const array = response.getMessage()!.getValue_asU8();
  //               const statusUpdate = SystemStatusUpdate.deserializeBinary(array).toObject(true);
  //               statusUpdate.targetstate=statusUpdate.currentstate+1;
  //               if (statusUpdate) {
  //                 this.statusSubject.next(statusUpdate);
  //               }
  //             }
  //           }
         
  //           await new Promise(resolve => setTimeout(resolve, 500));
  //           handleEvent();
  //         } catch (error) {
  //           console.error('Request error:', error);
          
  //           await new Promise(resolve => setTimeout(resolve, 500));
  //           handleEvent();
  //         }
  //       };

  //       handleEvent();
  //     });

  //   };
     
  //   eventLoop().pipe(
  //     switchMap(() => eventLoop()),
  //     retryWhen(errors => errors.pipe(delay(500))) 
  //   ).subscribe({
  //     next: _ => {},
  //     error: err => {
  //       console.error('Stream error:', err);
  //     }
  //   });
  // }


  async startListeningToEvent_statusUpdate() {
    const request = new Empty();
    //  console.log("entered");
    const eventLoop = () => {
      delay(100);
      return new Observable<MessageWrapper>(observer => {
        const handleEvent = async () => {
          try {
            const response = await this.requestEvent();
            //console.log("response=" +response);
            if (response && response.message) {      
              // console.log("L0");        
              // console.log(response.message.typeUrl);
              // console.log(SystemStatusUpdate.typeName);
              if(response.message.typeUrl.endsWith(SystemStatusUpdate.typeName)) {
                const statusUpdate = Any.unpack(response.message, SystemStatusUpdate);
                // console.log("l1"+ statusUpdate.currentState);
                statusUpdate.targetState=statusUpdate.currentState+1;
                // console.log("l2"+ statusUpdate.targetState);
                if (statusUpdate) {
                  this.statusSubject.next(statusUpdate);
                }
              } else if(response.message.typeUrl.endsWith(MessagesAvailableResponse.typeName)) {
                const messageResponse = Any.unpack(response.message, MessagesAvailableResponse);
                
                  this.messagesAvailableSubject.next(messageResponse);
              } 
              else if(response.message.typeUrl.endsWith(DeviceStatusResponse.typeName)) {
                const messageResponse = Any.unpack(response.message, DeviceStatusResponse);
              
                   SessionConfiguration.PCBboard =  messageResponse.device?.fPGAVersion!;
                   if(SessionConfiguration.PCBboard==0)
                    SessionConfiguration.PCBboard=eBoard.HWBoard2_0;
                    //   alert( "PCBboard"+messageResponse.device?.fPGAVersion!); //HWB
              }
            }
         
            await new Promise(resolve => setTimeout(resolve, 500));
            handleEvent();
          } catch (error) {
            console.error('Request error:', error);
          
            await new Promise(resolve => setTimeout(resolve, 500));
            handleEvent();
          }
        };

        handleEvent();
      });

    };
     
    eventLoop().pipe(
      switchMap(() => eventLoop()),
      retryWhen(errors => errors.pipe(delay(500))) 
    ).subscribe({
      next: _ => {},
      error: err => {
        console.error('Stream error:', err);
      }
    });
  }


 
  // private protocolMessagesAllowedThroughTap: ProtocolMessagesAllowed = {
  //   'I3C__1': (response: MessagesAvailableResponse) => {  
     
  //     this.messagesAvailableSubject.next(response);
  //   },
 
  // };
  
  //  requestFrames(protocolName: string, startIndex: number, count: number): Observable<Array<ProtocolFrame>> {
  //   return this.requestMessages(protocolName, startIndex, count).pipe(
  //     switchMap((messageResponse) => {
  //       if (!messageResponse) {
  //         return throwError('No data received.');
  //       }
  
  //       // Process the response
  //       return of(this.processFrames(messageResponse, protocolName));
  //     }),
  //     retryWhen((errors) =>
  //       errors.pipe(
  //         tap((error) => {
  //           console.error("Error after request message:", error);
  //           if (error instanceof Error) {
  //             console.error("Error message:", error.message);
              
  //           } 
  //         }),
  //         delay(1000) // Retry after 1 second
  //       )
  //     ),
  //     catchError((error) => {
  //       console.error('Error requesting frames:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  
  async requestMessages(protocolName: string, startIndex: bigint, count: bigint): Promise<ProtoFrame[] | null> {
    try {
      const request = RequestMessages.create();
      request.protocolName = protocolName;
      request.request = { oneofKind: "indexBased", indexBased: { offset: startIndex, count: count } };
  
      const messageWrapper = MessageWrapper.create();
      messageWrapper.message = Any.pack(request, RequestMessages);
  
      const response = await this.client.request(messageWrapper);
      const status = await response.status;
  
      if (status.code === "OK") {
        const responseWrapper = await response.response;
        const messagesResponse = Any.unpack(responseWrapper.responseMessage!, MessagesResponse);
  
        if (messagesResponse) {
          return this.processFrames(messagesResponse, protocolName);
        } else {
          console.error("Failed to unpack MessagesResponse.");
          return null;
        }
      } else {
        console.error("Request failed with status:", status);
        return null;
      }
    } catch (error) {
      console.error("Error in requestMessages:", error);
      return null;
    }
  }
  
  



   index:number=1;

   private processFrames(messagesResponse: MessagesResponse, protocolName: string): ProtoFrame[] {
    const protoFrames: ProtoFrame[] = [];
  
    messagesResponse.messages.forEach(f => {
      let i3cMessage: ExtendedFrame_I3C | undefined;
      let packets: PacketI3C[] = [];
  
      if (f.extendedFrame?.typeUrl.endsWith(I3CFrame.ExtendedFrame_I3C.typeName)) {
        i3cMessage = Any.unpack(f.extendedFrame, I3CFrame.ExtendedFrame_I3C) as ExtendedFrame_I3C;
  
        i3cMessage.packets.forEach(p => {
          let packet: PacketI3C | undefined;  
  
          switch (p.packet.oneofKind) {
            case 'address':
              const addressFrame: AddressFrame = {
                addressValue: p.packet.address?.addressValue,
                packetType: p.packet.address?.packetType,
                protocolMode: p.packet.address?.protocolMode,
                hostDevice: p.packet.address?.hostDevice,
                description: p.packet.address?.description,
                transferType: p.packet.address?.transferType,
                errorType: p.packet.address?.errorType,
                ackType: p.packet.address?.ackType,
                is10Bit: p.packet.address?.is10Bit,
                startType: p.packet.address?.startType,
                addressInterval: {
                  startTime: p.packet.address?.addressInterval?.startTime ?? 0,
                  endTime: p.packet.address?.addressInterval?.endTime ?? 0
                },
                transferInterval: {
                  startTime: p.packet.address?.transferInterval?.startTime ?? 0,
                  endTime: p.packet.address?.transferInterval?.endTime ?? 0
                },
                ackInterval: {
                  startTime: p.packet.address?.ackInterval?.startTime ?? 0,
                  endTime: p.packet.address?.ackInterval?.endTime ?? 0
                }
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'address', address: addressFrame } };
              packets.push(packet);  
              break;
  
            case 'command':
              const commandFrame: CommandFrame = {
                commandValue: p.packet.command?.commandValue ?? 0,
                packetType: p.packet.command?.packetType,
                protocolMode: p.packet.command?.protocolMode,
                hostDevice: p.packet.command?.hostDevice,
                description: p.packet.command?.description,
                parity: p.packet.command?.parity,
                errorType: p.packet.command?.errorType,
                commandInterval: {
                  startTime: p.packet.command?.commandInterval?.startTime ?? 0,
                  endTime: p.packet.command?.commandInterval?.endTime ?? 0
                },
                commandParityInterval: {
                  startTime: p.packet.command?.commandParityInterval?.startTime ?? 0,
                  endTime: p.packet.command?.commandParityInterval?.endTime ?? 0
                }
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'command', command: commandFrame } };
              packets.push(packet);  
              break;
  
            case 'data':
              const dataFrame: DataFrame = {
                dataValue: p.packet.data?.dataValue ?? 0,
                packetType: p.packet.data?.packetType,
                protocolMode: p.packet.data?.protocolMode,
                hostDevice: p.packet.data?.hostDevice,
                description: p.packet.data?.description,
                transmitBit: p.packet.data?.transmitBit,
                errorType: p.packet.data?.errorType,
                mLaneType: p.packet.data?.mLaneType,
                dataInterval: p.packet.data?.dataInterval,
                dataTransmitInterval: p.packet.data?.dataTransmitInterval
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'data', data: dataFrame } };
              packets.push(packet);  
              break;
            case 'start':
              const startFrame: StartFrame = {
                startType: p.packet.start?.startType,
                startInterval: p.packet.start?.startInterval
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'start', start: startFrame } };
              packets.push(packet); 
              break;
  
            case 'hDR':
              const hdrFrame: HDRFrame = {
                hdrValue: p.packet.hDR?.hdrValue,
                packetType: p.packet.hDR?.packetType,
                protocolMode: p.packet.hDR?.protocolMode,
                hostDevice: p.packet.hDR?.hostDevice,
                description: p.packet.hDR?.description,
                transmitBit: p.packet.hDR?.transmitBit,
                errorType: p.packet.hDR?.errorType,
                preamble: p.packet.hDR?.preamble ?? 0,
                isMaster1_1: p.packet.hDR?.isMaster1_1,
                hdrDataInterval: p.packet.hDR?.hdrDataInterval
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'hDR', hDR: hdrFrame } };
              packets.push(packet);  
              break;
  
            case 'stop':
              const stopFrame: StopFrame = {
                stopInterval: p.packet.stop?.stopInterval
              };
              packet = { hasStop: p.hasStop, packet: { oneofKind: 'stop', stop: stopFrame } };
              packets.push(packet);  
              break;
  
            case 'extendedAddress':
              console.log('Handling extendedAddress frame type');
             
              break;
  
            default:
              console.error("Unknown packet type:", p.packet.oneofKind);
              return;
          }
        });
      }
    //     } else if (f.extendedFrame?.typeUrl.endsWith(MCTPFrame.ExtendedFrame_MctpI3C.typeName)) {
  //       let mctpMessage = Any.unpack(f.extendedFrame, MCTPFrame.ExtendedFrame_MctpI3C);
  //       // Process MCTP frame
  //     } else {
  //       console.error("Unknown frame type:", f.extendedFrame?.typeUrl);
  //     }
      if (i3cMessage) {
        const protoFrame: ProtoFrame = {
          frameIndex: this.index++,
          frameType: i3cMessage.frame,
          errorType: i3cMessage.error,
          protocol: I3CFrame.ProtocolTypee.I3C,
          startTime: f.startTime,
          stopTime: f.stopTime,
          packets: packets
        };
  
        protoFrames.push(protoFrame); 
      }
    });
  
    return protoFrames;
  }
  
  
 
  


async requestDeviceList(): Promise<DeviceInfo[]> {
  try {
    const message = GetDeviceListMessage.create();

    const deviceListWrapper = MessageWrapper.create({
      message: Any.pack(message, GetDeviceListMessage)
    });

    const responseWrapper = await this.client.request(deviceListWrapper);

    const responseWrapper1 = await responseWrapper.response;

    const deviceListResponse = Any.unpack(responseWrapper1.responseMessage!, DeviceListResponse);
   //alert("devices are"+deviceListResponse.devices);
    if (!deviceListResponse || !deviceListResponse.devices || deviceListResponse.devices.length === 0) {
      alert("No devices connected");
      throw new Error('No devices connected');
    
    }

    return deviceListResponse.devices;
  } catch (error) {
    console.error('Error fetching device list', error);
    throw error;
  }
}




// Setup the selected device by sending a SetupDeviceMessage to the backend

async setupDevice(userName: string, deviceList: DeviceInfo[]): Promise<void> {
  try {
 
    if (!deviceList || deviceList.length === 0) {
      throw new Error('No devices available for selection');
    }


    let selectedDevice = deviceList[0];


    if (deviceList.length > 1) {
      selectedDevice = deviceList[1]; 
    }

   
    const setupDeviceMessage: SetupDeviceMessage = SetupDeviceMessage.create({
      userName: userName,
      selectedDevice: selectedDevice 
    });

   
    const messageWrapper = MessageWrapper.create();
    messageWrapper.message = Any.pack(setupDeviceMessage,SetupDeviceMessage );

    await this.client.sendMessage(messageWrapper);

  } catch (error) {
    console.error('Error setting up device', error);
    throw error;
  }
}


     


private deviceSession: DeviceSession | null = DeviceSession.create();

private readonly headerPacket: string = "00 FE B5 9C 8F 60 D4 BE D9 71 E2 FA 08 00 45 00 " +
                                        "04 24 01 00 40 00 01 88 F0 93 C0 A8 01 32 C0 A8 " +
                                        "01 3C 09 01 09 00 00 08 69 AF";

public async sendExpdConfiguration(packets: Uint8Array[]): Promise<void> {
    if (this.deviceSession === null || !this.deviceSession.connected) {
        try {
          
            const request = DeviceSessionRequest.create({ sessionType: SessionType.ExerciserDataExchange });
            
      
            const messageWrapper = MessageWrapper.create({
                message: Any.pack(request, DeviceSessionRequest)
            });
              // alert(messageWrapper.message?.typeUrl); 
       
            const responseWrapper = this.client.request(messageWrapper);
            const responseWrapper1 = await responseWrapper.response;
            
         
            const deviceSession = Any.unpack(responseWrapper1.responseMessage!, DeviceSession);
            
            if (!deviceSession || !deviceSession.connected) {
                alert("Not Connected");
                throw new Error('Not able to connect');
            }
            
         
            this.deviceSession = deviceSession;
        } catch (error: unknown) {
            alert("Error while establishing device session");
            if (error instanceof Error) {
                throw new Error(`Error connecting to device session: ${error.message}`);
            }
            throw new Error('Unknown error occurred');
        }
    }

    // Adding the header packet

const headerBytesArray = new Uint8Array(
 this. headerPacket.split(' ').map(byteStr => parseInt(byteStr, 16))
);
console.log("headerBytesArray: ", headerBytesArray);


  const updatedPackets = packets.map(packet => {

  const packetWithHeader = new Uint8Array(headerBytesArray.length + packet.length);

  
  packetWithHeader.set(headerBytesArray);
  packetWithHeader.set(packet, headerBytesArray.length); 

  return packetWithHeader;
});

console.log("updatedPackets: ", updatedPackets);


 const exerciserData = ExerciserData.create({ blocks: updatedPackets });

console.log("exerciserData: ", JSON.stringify(exerciserData));


    const writeMessage = SessionWriteMessage.create({
        session: this.deviceSession,
        blockWrite: {
            oneofKind: 'exerciserData',
            exerciserData: exerciserData
        }
    });

   // alert("writeMessage packets: " +JSON.stringify(writeMessage));
    try {
       
        const writeMessageWrapper = MessageWrapper.create({
            message: Any.pack(writeMessage, SessionWriteMessage)
        });
      

          //  alert(writeMessageWrapper.message?.typeUrl); 
        // Sending the write request
         
       // alert(responseWrapper);    
        const responseWrapper = this.client.request(writeMessageWrapper);
       const responseWrapper1 = await responseWrapper.response;

    
const writeStatus = Any.unpack(responseWrapper1.responseMessage!, SessionWriteStatus);


if (writeStatus) {
    alert("Write Status: " + (writeStatus.successful ? "Successful" : "Failed") + "\nError: " + writeStatus.error);
} else {
    alert("Failed to unpack the response or write status is undefined.");
}


console.log("Write Status Object: ", writeStatus);

      
      
        if (!writeStatus || !writeStatus.successful) {
            this.deviceSession = null;
            alert(`Error while sending data1: ${writeStatus.error}`);
            throw new Error(`Error while sending data: ${writeStatus.error}`);
        }
    } catch (error: any) {
        this.deviceSession = null;
        alert(`Error while sending data2, ${JSON.stringify(error)}`);
        if (error instanceof Error) {
          alert(`Error while sending data, ${JSON.stringify(error)}`);
            throw new Error(`Error while sending data3: ${error.message}`);
        
        }
        alert("Error while sending data");
        throw new Error('Unknown error occurred');
    }
}

          
         
                                        
        private delay(ms: number): Promise<void> {
                             return new Promise(resolve => setTimeout(resolve, ms));
                               }
}  

