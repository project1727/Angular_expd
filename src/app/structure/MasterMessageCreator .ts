
import { eBufferTransfer, eCTSFormats, eFrameType, eI2CAddressType, eIBIInterrupt, eResetPattern, eScriptType, eTransferType } from '../enums/enum';
import { IPacket } from '../interfaces/IPacket.interface';

export class MasterMessageCreator implements IPacket {
    data: Array<number>;
    subAddress: Array<number>;

    constructor() {
        this.data = [];
        this.subAddress = [];
    }

    frameType?: eFrameType;
    
    get scriptType(): eScriptType {
        return eScriptType.Bus;
    }

    transferType?: eTransferType;

    addressEnable?: boolean;

    dataCount?: number;

    get Data(): Array<number> {
        return this.data;
    }

    set Data(value: Array<number>) {
        this.data = value;
    }

    hasStop?: boolean;

    get SubAddress(): Array<number> {
        return this.subAddress;
    }

    set SubAddress(value: Array<number>) {
        this.subAddress = value;
    }

    defineByte?: number;
    address?: number;

    nodeId?: string;
    i2CAddressType?: eI2CAddressType;
    command?: number;

    mode?: eBufferTransfer

    bufferAccess?: boolean;

    commandParity?: boolean;

    dataParity?: boolean;

    requestEnable?: boolean;

    isEntdaa?: boolean;
    
    ctsWord?: eResetPattern;

    ctsNonstandadFormat?: eCTSFormats;

    isLogicEnable?: boolean;

    ibiInterrupt?: eIBIInterrupt;

    bitCount?: number;

    byteCount?: number;

    glitchResolution?: number;
}
