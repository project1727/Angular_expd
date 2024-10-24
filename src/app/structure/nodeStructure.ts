import { BehaviorSubject } from 'rxjs';
import { eDCR, eDeviceType, eNodeType, eTerminationType, eTriggerInOut, eVoltagePath } from '../enums/enum';
import { SessionConfiguration } from './sessionConfiguration';
// import { DefaultPubsubService, PubsubService } from '../service/pubsub.service';


export class NodeStructure {
    private _nodeId: number | undefined;
    private _DCR: eDCR;
    private _MRL: number;
    private _reservedDCR: string;
    private _BCR: number;
    private _PID: number;
    private _triggerSelection: eTriggerInOut;
    private _slaveVersion: number;
    private _deviceType: eDeviceType;
    private _termination: eTerminationType;
    private _staticAddress: string;
    private _dynamicAddress: number;
    private _groupAddress: number;
    private _nodeType: eNodeType;
    private _voltage: number ;
    private _MWL: number;
    private _spikeFilterEnable: boolean;
  
    constructor();
    constructor(node: NodeStructure);
    constructor(node?: NodeStructure) {

      if (node) {
        this._nodeId = node._nodeId;
        this._DCR = node._DCR;
        this._MRL = node._MRL;
        this._reservedDCR = node._reservedDCR;
        this._BCR = node._BCR;
        this._PID = node._PID;
        this._triggerSelection = node._triggerSelection;
        this._slaveVersion = node._slaveVersion;
        this._deviceType = node._deviceType;
        this._termination = node._termination;
        this._staticAddress = node._staticAddress;
        this._dynamicAddress = node._dynamicAddress;
        this._groupAddress = node._groupAddress;
        this._nodeType = node._nodeType;
        this._voltage = node._voltage;
        this._MWL = node._MWL;
        this._spikeFilterEnable = node._spikeFilterEnable;
      } else {
        // Default constructor logic
        this._nodeType = eNodeType.Master;
      //  this._PID = (0x2AC << 33);
      //  console.log(this._PID);
     // 0x2AC is multiplied by 2^33 to achieve the equivalent of left-shifting 0x2AC by 33 bits.
        this._PID = (0x2AC * Math.pow(2, 33));
        console.log(this._PID);
        this._termination=eTerminationType.ON;
        this._BCR = 0x6;
        this._DCR = eDCR.Generic;
        this._staticAddress = '45';
        this._dynamicAddress = 0xFF;
        this._deviceType = eDeviceType.Internal;
        this._MWL = 0x10;
        this._reservedDCR = '0';
        this._slaveVersion = 0;
        this._triggerSelection = eTriggerInOut.Trigger_OUT;
        this._groupAddress = 0xFF;
        this._MRL = 0x10;
        this._spikeFilterEnable = false;
        this._voltage = SessionConfiguration.selectedVoltage === eVoltagePath.VariablePath ? 3.3 : 1;
      }
    }


    
  get nodeId(): number |undefined {
    return this._nodeId;
  }

  set nodeId(value: number) {
    this._nodeId = value;
    this.raisePropertyChanged('nodeId');
  }

  get DCR(): eDCR {
    return this._DCR;
  }

  set DCR(value: eDCR) {
    this._DCR = value;
    this.raisePropertyChanged('DCR');
  }

  get MRL(): number {
    return this._MRL;
  }

  set MRL(value: number) {
    this._MRL = value;
    this.raisePropertyChanged('MRL');
  }

  get reservedDCR(): string {
    return this._reservedDCR;
  }

  set reservedDCR(value: string) {
    this._reservedDCR = value;
    this.raisePropertyChanged('reservedDCR');
  }



  get PID(): number {
    return this._PID;
  }

  set PID(value: number) {
    this._PID = value;
    this.raisePropertyChanged('PID');
  }

  get triggerSelection(): eTriggerInOut {
    return this._triggerSelection;
  }

  set triggerSelection(value: eTriggerInOut) {
    this._triggerSelection = value;
    this.raisePropertyChanged('triggerSelection');
  }

  get slaveVersion(): number {
    return this._slaveVersion;
  }

  set slaveVersion(value: number) {
    this._slaveVersion = value;
    this.raisePropertyChanged('slaveVersion');
  }

  get deviceType(): eDeviceType {
    return this._deviceType;
  }

  set deviceType(value: eDeviceType) {
    this._deviceType = value;
    this.raisePropertyChanged('deviceType');
  }

  get termination(): eTerminationType {
    return this._termination;
  }

  set termination(value: eTerminationType) {
    this._termination = value;
    this.raisePropertyChanged('termination');
  }

  get staticAddress(): string {
   // console.log(this._staticAddress);
    return this._staticAddress;
  }

  set staticAddress(value: string) {
    this._staticAddress = value.toLowerCase();
    console.log(this.staticAddress);
    this.raisePropertyChanged('staticAddress');
  }

  get dynamicAddress(): number {
    return this._dynamicAddress;
  }

  set dynamicAddress(value: number) {
    this._dynamicAddress = value;
    this.raisePropertyChanged('dynamicAddress');
  }

  get groupAddress(): number {
    return this._groupAddress;
  }

  set groupAddress(value: number) {
    this._groupAddress = value;
    this.raisePropertyChanged('groupAddress');
  }


  get BCR(): number {
    return this._BCR;
  }

  set BCR(value: number) {
    this._BCR = value;
    this.raisePropertyChanged('BCR');
    // Publish the updated BCR when BCR changes
    // DefaultPubsubService.publish('BCR_UPDATED', this._BCR);

  }
  get nodeType(): eNodeType {
    return this._nodeType;
  }

  set nodeType(value: eNodeType) {
    this._nodeType = value;
    this.raisePropertyChanged('nodeType');
    this._BCR = this._nodeType !== eNodeType.Master ? (this._BCR & 0x3F) : (this._BCR & 0x3F | 0x40);
    console.log("_BCR AFTER changing node ="+this._BCR);
   // Publish the updated BCR
   //DefaultPubsubService.publish('BCR_UPDATED', this._BCR);
   //PubSub.publish('BCR_UPDATED', this._BCR);
    if (this._nodeType === eNodeType.Sec_Master) {
      this._DCR = eDCR.Secondary_Master;
    }
  }

  
  get voltage(): number  {
    return this._voltage;
  }

  set voltage(value: number) {
    if (value < 0.6 || value > 5.25) {
      value = 3.3;
    }
    this._voltage = value;
    this.raisePropertyChanged('voltage');
  }

  get MWL(): number {
    return this._MWL;
  }

  set MWL(value: number) {
    if (value < 0 || value > 0x3FF) {
      value = 0x10;
    }
    this._MWL = value;
    this.raisePropertyChanged('MWL');
  }

  get spikeFilterEnable(): boolean {
    return this._spikeFilterEnable;
  }

  set spikeFilterEnable(value: boolean) {
    this._spikeFilterEnable = value;
    this.raisePropertyChanged('spikeFilterEnable');
  }

  private raisePropertyChanged(propertyName: string): void {
    // Handle property change logic, typically using a state management approach or RxJS Subjects/BehaviorSubjects
   // console.log(`${propertyName} changed the value`);
  }
}

