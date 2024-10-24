import { AcknowledgeType, AddressType, DataDescription, ErrorType, ExtendedAddressFrame, FrameType, HostDeviceType, MLaneType, PacketType, ParityType, PreambleState, ProtocolMode, ProtocolTypee, StartType, TransferType } from "../../../.generated/protos/I3CFrame";


export interface ExtendedFrame_I3C {
    frame: FrameType;
    error: ErrorType;
    packets: PacketI3C[];
  }


  export interface ProtoFrame {
    startTime: number;
    stopTime: number;
    frameIndex: number;
    frameType: FrameType;
    packets: PacketI3C[];
    errorType: ErrorType ;
    protocol: ProtocolTypee;
  }
  
  


export interface PacketI3C {
    hasStop: boolean;
    packet: {
      oneofKind: 'address' | 'command' | 'data' | 'hDR' | 'start' | 'stop' | 'extendedAddress';
      address?: AddressFrame;
      command?: CommandFrame;
      data?: DataFrame;
       hDR?:HDRFrame;
       start?:StartFrame;
       stop?:StopFrame;
       extendedAddress?:ExtendedAddressFrame
    };
}

interface MessageInterval {
    startTime: number | undefined;
    endTime: number | undefined;
  }
  
  
  // AddressFrame Interface
 export interface AddressFrame {
    addressValue: number | undefined;               
    packetType: PacketType | undefined;            
    protocolMode: ProtocolMode |undefined ;         
    hostDevice: HostDeviceType |undefined;        
    description: AddressType |undefined;          
    transferType: TransferType |undefined;        
    errorType: ErrorType |undefined;              
    ackType: AcknowledgeType |undefined;          
    is10Bit: boolean |undefined;                   
    startType: StartType |undefined;             
    addressInterval: MessageInterval;  
    transferInterval: MessageInterval; 
    ackInterval: MessageInterval;       
  }
  
  // CommandFrame Interface
  export interface CommandFrame {
    commandValue: number |undefined;            
    packetType: PacketType |undefined;             
    protocolMode: ProtocolMode| undefined;         
    hostDevice: HostDeviceType |undefined;         
    description: FrameType |undefined;            
    parity: ParityType |undefined;              
    errorType: ErrorType |undefined;             
    commandInterval: MessageInterval;  
    commandParityInterval: MessageInterval; 
  }
  
  // DataFrame Interface
  export interface DataFrame {
    dataValue: number | undefined;
    packetType: PacketType | undefined;
    protocolMode: ProtocolMode | undefined;
    hostDevice: HostDeviceType | undefined;
    description: DataDescription | undefined;
    transmitBit: ParityType | undefined;
    errorType: ErrorType | undefined;
    mLaneType: MLaneType | undefined;
    dataInterval: MessageInterval | undefined;
    dataTransmitInterval: MessageInterval | undefined;
  }
  

  export interface HDRFrame {
    hdrValue: number | undefined;
    packetType: PacketType | undefined;
    protocolMode: ProtocolMode | undefined;
    hostDevice: HostDeviceType | undefined;
    description: PreambleState | undefined;
    transmitBit: ParityType | undefined;
    errorType: ErrorType | undefined;
    preamble: number | undefined;
    isMaster1_1: boolean | undefined;
    hdrDataInterval: MessageInterval | undefined;
  }
  
  export interface StartFrame {
    startType: StartType | undefined;
    startInterval: MessageInterval  |undefined;
  }
  export interface StopFrame {
    stopInterval: MessageInterval | undefined;
  }
    