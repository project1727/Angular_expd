// import { Injectable } from '@angular/core';
// import { IScriptTranslator } from '../interfaces/IScriptTranslator.interface ';
// import { IScript } from '../interfaces/IScript .interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class MasterScriptTranslatorService  implements IScriptTranslator{

//   constructor() { }

  
//     getPacketsFromText(text: string): IScript[] {
//       let formattedText = text.replace(/\r/g, '').replace(/\t/g, '');
//       let lines = formattedText.split('\n').filter(line => line.trim() !== '{' && line.trim() !== '}');
//       let packetList: IScript[] = [];
  
//      // ResultHolder.getInstance().isErrorOccur = false;
  
   
//       let startComment = lines.find(line => line.startsWith("/*"));
//       let endComment = lines.find(line => line.endsWith("*/"));
  
//       if (startComment && endComment) {
//         let start = lines.indexOf(startComment);
//         let end = lines.indexOf(endComment);
//         lines.splice(start, end - start + 1); 
//       }
  
//       lines.forEach(line => {
//         if (line.startsWith("//") || line === '' || line === '{' || line === '}') {
//           return;
//         }
  
//         let packet = this.getPacketFromScriptLine(line);
//         // if (packet) {
//         //   if (this.isMasterMessage(packet)) {
//         //     let master = packet as MasterMessageCreator;
//         //     if (master.frameType === eFrameType.PRIVATE || master.frameType === eFrameType.I2C_MESSAGE) {
//         //       if (master.subAddress && master.subAddress.length > 0) {
//         //         packetList.push(...this.dummyWriteRead(master));
//         //         return;
//         //       } else if (master.i2CAddressType === eI2CAddressType._10bAddress) {
//         //         packetList.push(...this.dummy10BitWrite(master));
//         //         return;
//         //       }
//         //     }
//         //   }
//         //   packetList.push(packet);
//         // }
//       });
  
//       return packetList;
//     }





//     getPacketFromScriptLine(line: string): IScript | null {
//     //   let packet: IScript | null = null;
//     // //  const interpreter = new MasterScriptInterpreter();
//     //   const pointer: Pointer = new Pointer();
  
//     //  // interpreter.structuralAnalysis(line, pointer); // Assume this method modifies pointer object
  
//     //   if (pointer.scriptType === eScriptType.Sys) {
//     //     packet = this.getSystemInfo(pointer);
//     //   }
//       //  else if (pointer.scriptType === eScriptType.SysExtended) {
//       //   packet = this.getExtendedSystemInfo(pointer);
//       // } else if (pointer.scriptType === eScriptType.Loop) {
//       //   packet = this.getLoopInfo(pointer);
//       // } else if (pointer.scriptType === eScriptType.BusExtend) {
//       //   packet = this.getDDRMessage(pointer);
//       // } else if (pointer.scriptType === eScriptType.BufferAccess) {
//       //   packet = this.getBufferAccessMessage(pointer);
//       // } else if (pointer.scriptType === eScriptType.CTS || pointer.scriptType === eScriptType.ExtendedErrors) {
//       //   packet = this.getCTSMessage(pointer);
//       // } else if (pointer.scriptType === eScriptType.ScalingFactor) {
//       //   packet = this.getScalingFactorInfo(pointer);
//       // } else {
//       //   switch (pointer.frameType) {
//       //     case .PRIVATE:
//       //       packet = this.getPrivateMessage(pointer);
//       //       break;
//       //     case eFrameType.I2C_MESSAGE:
//       //       packet = this.getI2CMessage(pointer);
//       //       break;
//       //     case eFrameType.BROADCAST:
//       //       if (pointer.command === 0x20 || pointer.command === 0x21 || pointer.command === 0x22) {
//       //         this.hdrIndex = 0;
//       //         this.ddrCmd = pointer.command;
//       //         packet = this.getDDRMessage(pointer);
//       //       } else if (pointer.command !== -1) {
//       //         packet = this.getBroadCastMessage(pointer);
//       //       } else {
//       //         packet = null;
//       //       }
//       //       break;
//       //     case eFrameType.DIRECTED:
//       //       if (pointer.command !== -1) {
//       //         packet = this.getDirectedMessage(pointer);
//       //       } else {
//       //         packet = null;
//       //       }
//       //       break;
//       //     case eFrameType.HOTJOIN:
//       //     case eFrameType.IBI:
//       //     case eFrameType.MatershipRequest:
//       //       packet = this.getInterruptMessage(pointer);
//       //       break;
//       //     case eFrameType.HDRExitPattern:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.HDRExitPattern });
//       //       break;
//       //     case eFrameType.SlaveResetPattern:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.SlaveResetPattern });
//       //       break;
//       //     case eFrameType.IBI_Response:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.IBI_Response });
//       //       break;
//       //     case eFrameType.Test_Pattern:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.Test_Pattern, ctsNonstandadFormat: pointer.ctsFormat });
//       //       break;
//       //     case eFrameType.Ext_DUT:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.Ext_DUT, isLogicEnable: pointer.enableLogic });
//       //       break;
//       //     case eFrameType.GLITCH_Generator:
//       //       packet = new MasterMessageCreator({ frameType: eFrameType.GLITCH_Generator, bitCount: pointer.bitCount, byteCount: pointer.byteCount, glitchResolution: pointer.glitchRes, requestEnable: pointer.request });
//       //       break;
//       //     default:
//       //       packet = null;
//       //       break;
//       //   }
//       // }
  
//      // return packet;
//     }



// }


