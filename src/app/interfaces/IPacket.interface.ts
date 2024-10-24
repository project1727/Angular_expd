import { eFrameType, eTransferType } from "../enums/enum";
import { IScript } from "./IScript .interface";

// export interface IPacket extends IScript {
//     readonly frameType: eFrameType;
//     transferType: eTransferType;
//     dataCount: number;
//     data: number[];
//     hasStop: boolean;
//   }
export interface IPacket {
    frameType?: eFrameType;  // Optional
    transferType?: eTransferType;  // Optional
    addressEnable?: boolean;  // Optional
    dataCount?: number;  // Optional
    hasStop?: boolean;  // Optional

}
