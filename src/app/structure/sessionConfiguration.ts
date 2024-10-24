import * as fs from 'fs';
import { eAnalyzerMode, eBoard, eHostDevice, eIBIInterrupt, eModeSelection, eRxStatus, eSourceType, eTestCode, eTriggerType, eVersion, eVoltagePath } from '../enums/enum';
import { NodeStructure } from './nodeStructure';
//import { I3CDirectoryInfo } from './I3CDirectoryInfo'; // Adjust imports as needed

export class SessionConfiguration {
  static SpecVersion: eVersion = eVersion.Version_1_1;
  static IsNotReq = false;
  static IsCaptureImage = false;
  static DeviceMode: eHostDevice = eHostDevice.Slave;
  static modeSelection: eModeSelection;
  static SourceType: eSourceType;
  static ConnectionStatus = false;
  static readonly Clk_ChannelIndex = 11;
  static readonly Data_ChannelIndex = 10;
  static readonly Data_ChannelIndex1 = 9;
  static readonly Data_ChannelIndex2 = 8;
  static readonly Data_ChannelIndex3 = 7;
  static AnalyzerMode: eAnalyzerMode = eAnalyzerMode.I2C_only;
  static PCBboard: eBoard;
  static SDWriteStatus: eRxStatus;
  static SupportI2C = false;
  static CaptureStatus = false;
  static IBIInterruptType: eIBIInterrupt = eIBIInterrupt.NA;
  static isAPIEnabled = true;
  static stopCapture = false;
  static StopCapture = false;
  static StopDecode = false;
  static _IsDecocdeActive = false;
  static HWVersion: number;
  static suspendFileNumber = '1';
  static CTSEnable = false;
  static Deviceprog = false;
  static MCTPEnable = false;
  static SupportMCTP = false;
  static selectedVoltage: eVoltagePath = eVoltagePath.VariablePath;
  static isPrevSavetrace = true;
  static triggerType: eTriggerType = eTriggerType.Auto;
  static CTSSlaveUSBCounter = 0;
 // static TriggerConfig: TriggerConfiguration;
  static testCode: eTestCode= eTestCode.NA;
  static SlaveNodeId = 1;
  static TriggerTime = 0;
  static StopWhenTrigger = false;
  static IsCustomView = false;
  static isDecodeActive: boolean;
  static isLastBlock: boolean;
  static deviceTest: eHostDevice;
  static nodeList: NodeStructure[] = [];
  static traceFilePath: string;
  static PrevtraceFilePath: string;
  static suspendSession = false;

  // Event handlers
//   static PublishDecodeStatus?: (isDecodeActive: boolean) => void;
//   static PublishSDStatus?: (isDecodeActive: boolean) => void;
//   static PublishCTSStatus?: (device: eHostDevice) => void;
//   static PublishModifiedGroup?: (frame: [eGroupSlave, TestCase[]]) => void;

//   static Initialize(): void {
//    // const logPath = `${I3CDirectoryInfo.ErrorPath}/DebugLog.log`;
//    // fs.writeFileSync(logPath, `Application started @${new Date().toString()}\n`);
//   }

//   static WriteToLog(logMsg: string): void {
//     try {
//      //const logPath = `${I3CDirectoryInfo.ErrorPath}/DebugLog.log`;
//      // fs.appendFileSync(logPath, `${logMsg}\n`);
//     } catch (err) {
//       // Handle the error silently
//     }
//   }

//   static set IsDecodeActive(value: boolean) {
//     this._IsDecocdeActive = value;
//     this.PublishDecodeStatus?.(value);
//   }

//   static get IsDecodeActive(): boolean {
//     return this._IsDecocdeActive;
//   }

//   static set IsLastBlock(value: boolean) {
//     this.isLastBlock = value;
//     this.PublishSDStatus?.(value);
//   }

//   static get IsLastBlock(): boolean {
//     return this.isLastBlock;
//   }

//   static set DeviceTest(value: eHostDevice) {
//     this.deviceTest = value;
//     this.PublishCTSStatus?.(value);
//   }

//   static get DeviceTest(): eHostDevice {
//     return this.deviceTest;
//   }

//   static set DeviceTest1(value: [eGroupSlave, TestCase[]]) {
//     this.PublishModifiedGroup?.(value);
//   }

  // Other properties and methods similar to C# version
}
