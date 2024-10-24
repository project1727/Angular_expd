import { eBoard, eDCR, eI2CAddressType, eNodeType, eTerminationType } from "../enums/enum";
import { NodeStructure } from "../structure/nodeStructure";
import { Injectable } from '@angular/core';
import { SessionConfiguration } from "../structure/sessionConfiguration";

@Injectable({
  providedIn: 'root'
})



export class HardwareFactoryConverterService {
     voltageLookupTable1: Map<number, number>;
     voltageLookupTable2: Map<number, number>;
     voltageLookupTable3: Map<number, number>;
  
    constructor(){
        this.voltageLookupTable1 = new Map<number, number>();
        this.voltageLookupTable2 = new Map<number, number>();
        this.voltageLookupTable3 = new Map<number, number>();
    
        // Voltage Table 1 for Old Board
        this.voltageLookupTable1.set(0.926, 0x45);
        this.voltageLookupTable1.set(0.939, 0x44);
        this.voltageLookupTable1.set(0.952, 0x43);
        this.voltageLookupTable1.set(0.965, 0x42);
        this.voltageLookupTable1.set(0.980, 0x41);
        this.voltageLookupTable1.set(0.994, 0x40);
        this.voltageLookupTable1.set(1.008, 0x3F);
        this.voltageLookupTable1.set(1.024, 0x3E);
        this.voltageLookupTable1.set(1.04, 0x3D);
        this.voltageLookupTable1.set(1.109, 0x39);
        this.voltageLookupTable1.set(1.128, 0x38);
        this.voltageLookupTable1.set(1.147, 0x37);
        this.voltageLookupTable1.set(1.167, 0x36);
        this.voltageLookupTable1.set(1.188, 0x35);
        this.voltageLookupTable1.set(1.209, 0x34);
        this.voltageLookupTable1.set(1.232, 0x33);
        this.voltageLookupTable1.set(1.255, 0x32);
        this.voltageLookupTable1.set(1.280, 0x31);
        this.voltageLookupTable1.set(1.304, 0x30);
        this.voltageLookupTable1.set(1.509, 0x29);
        this.voltageLookupTable1.set(1.542, 0x28);
        this.voltageLookupTable1.set(1.579, 0x27);
        this.voltageLookupTable1.set(1.616, 0x26);
        this.voltageLookupTable1.set(1.655, 0x25);
        this.voltageLookupTable1.set(1.65, 0x25);
        this.voltageLookupTable1.set(1.695, 0x24);
        this.voltageLookupTable1.set(1.737, 0x23);
        this.voltageLookupTable1.set(1.782, 0x22);
        this.voltageLookupTable1.set(1.831, 0x21);
        this.voltageLookupTable1.set(1.881, 0x20);
        this.voltageLookupTable1.set(2.336, 0x19);
        this.voltageLookupTable1.set(2.419, 0x18);
        this.voltageLookupTable1.set(2.510, 0x17);
        this.voltageLookupTable1.set(2.607, 0x16);
        this.voltageLookupTable1.set(2.713, 0x15);
        this.voltageLookupTable1.set(2.826, 0x14);
        this.voltageLookupTable1.set(2.948, 0x13);
        this.voltageLookupTable1.set(3.073, 0x12);
        this.voltageLookupTable1.set(3.171, 0x11);
        this.voltageLookupTable1.set(3.245, 0x10);
        this.voltageLookupTable1.set(3.294, 0x00);
        this.voltageLookupTable1.set(3.247, 0x0F);
        this.voltageLookupTable1.set(1.091, 0x3A);
        this.voltageLookupTable1.set(1.08, 0x3A);
        this.voltageLookupTable1.set(1.074, 0x3B);
        this.voltageLookupTable1.set(1.056, 0x3C);
        this.voltageLookupTable1.set(1.476, 0x2A);
        this.voltageLookupTable1.set(1.445, 0x2B);
        this.voltageLookupTable1.set(1.414, 0x2C);
        this.voltageLookupTable1.set(1.385, 0x2D);
        this.voltageLookupTable1.set(1.357, 0x2E);
        this.voltageLookupTable1.set(1.330, 0x2F);
        this.voltageLookupTable1.set(1.32, 0x2F);
        this.voltageLookupTable1.set(2.258, 0x1A);
        this.voltageLookupTable1.set(2.185, 0x1B);
        this.voltageLookupTable1.set(2.117, 0x1C);
        this.voltageLookupTable1.set(2.054, 0x1D);
        this.voltageLookupTable1.set(1.993, 0x1E);
        this.voltageLookupTable1.set(1.936, 0x1F);
        this.voltageLookupTable1.set(1.95, 0x1F);
        this.voltageLookupTable1.set(1.0, 0x40);
        this.voltageLookupTable1.set(1.1, 0x39);
        this.voltageLookupTable1.set(1.2, 0x34);
        this.voltageLookupTable1.set(1.3, 0x30);
        this.voltageLookupTable1.set(1.4, 0x2C);
        this.voltageLookupTable1.set(1.5, 0x29);
        this.voltageLookupTable1.set(1.6, 0x26);
        this.voltageLookupTable1.set(1.7, 0x24);
        this.voltageLookupTable1.set(1.8, 0x21);
        this.voltageLookupTable1.set(1.9, 0x20);
        this.voltageLookupTable1.set(2.0, 0x1E);
        this.voltageLookupTable1.set(2.1, 0x1C);
        this.voltageLookupTable1.set(2.2, 0x1B);
        this.voltageLookupTable1.set(2.3, 0x19);
        this.voltageLookupTable1.set(2.4, 0x18);
        this.voltageLookupTable1.set(2.5, 0x17);
        this.voltageLookupTable1.set(2.6, 0x16);
        this.voltageLookupTable1.set(2.7, 0x15);
        this.voltageLookupTable1.set(2.8, 0x14);
        this.voltageLookupTable1.set(2.9, 0x13);
        this.voltageLookupTable1.set(3.0, 0x13);
        this.voltageLookupTable1.set(3.1, 0x12);
        this.voltageLookupTable1.set(3.2, 0x0);
        this.voltageLookupTable1.set(3.3, 0x0);
        //end Region

        // Voltage table2 for New Board
     
        this.voltageLookupTable2.set(0.805, 0x7F);
        this.voltageLookupTable2.set(0.812, 0x7E);
        this.voltageLookupTable2.set(0.818, 0x7D);
        this.voltageLookupTable2.set(0.825, 0x7C);
        this.voltageLookupTable2.set(0.831, 0x7B);
        this.voltageLookupTable2.set(0.837, 0x7A);
        this.voltageLookupTable2.set(0.849, 0x79);
        this.voltageLookupTable2.set(0.852, 0x78);
        this.voltageLookupTable2.set(0.858, 0x77);
        this.voltageLookupTable2.set(0.865, 0x76);
        this.voltageLookupTable2.set(0.873, 0x75);
        this.voltageLookupTable2.set(0.88, 0x74);
        this.voltageLookupTable2.set(0.888, 0x73);
        this.voltageLookupTable2.set(0.895, 0x72);
        this.voltageLookupTable2.set(0.903, 0x71);
        this.voltageLookupTable2.set(0.911, 0x70);
        this.voltageLookupTable2.set(0.92, 0x6F);
        this.voltageLookupTable2.set(0.928, 0x6E);
        this.voltageLookupTable2.set(0.936, 0x6D);
        this.voltageLookupTable2.set(0.945, 0x6C);
        this.voltageLookupTable2.set(0.953, 0x6B);
        this.voltageLookupTable2.set(0.962, 0x6A);
        this.voltageLookupTable2.set(0.971, 0x69);
        this.voltageLookupTable2.set(0.98, 0x68);
        this.voltageLookupTable2.set(0.99, 0x67);
        this.voltageLookupTable2.set(0.999, 0x66);
        this.voltageLookupTable2.set(1.009, 0x65);
        this.voltageLookupTable2.set(1.019, 0x64);
        this.voltageLookupTable2.set(1.029, 0x63);
        this.voltageLookupTable2.set(1.039, 0x62);
        this.voltageLookupTable2.set(1.05, 0x61);
        this.voltageLookupTable2.set(1.061, 0x60);
        this.voltageLookupTable2.set(1.072, 0x5F);
        this.voltageLookupTable2.set(1.083, 0x5E);
        this.voltageLookupTable2.set(1.094, 0x5D);
        this.voltageLookupTable2.set(1.106, 0x5C);
        this.voltageLookupTable2.set(1.118, 0x5B);
        this.voltageLookupTable2.set(1.13, 0x5A);
        this.voltageLookupTable2.set(1.143, 0x59);
        this.voltageLookupTable2.set(1.156, 0x58);
        this.voltageLookupTable2.set(1.169, 0x57);
        this.voltageLookupTable2.set(1.182, 0x56);
        this.voltageLookupTable2.set(1.196, 0x55);
        this.voltageLookupTable2.set(1.21, 0x54);
        this.voltageLookupTable2.set(1.224, 0x53);
        this.voltageLookupTable2.set(1.239, 0x52);
        this.voltageLookupTable2.set(1.254, 0x51);
        this.voltageLookupTable2.set(1.27, 0x50);
        this.voltageLookupTable2.set(1.285, 0x4F);
        this.voltageLookupTable2.set(1.302, 0x4E);
        this.voltageLookupTable2.set(1.318, 0x4D);
        this.voltageLookupTable2.set(1.335, 0x4C);
        this.voltageLookupTable2.set(1.353, 0x4B);
        this.voltageLookupTable2.set(1.371, 0x4A);
        this.voltageLookupTable2.set(1.389, 0x49);
        this.voltageLookupTable2.set(1.408, 0x48);
        this.voltageLookupTable2.set(1.427, 0x47);
        this.voltageLookupTable2.set(1.447, 0x46);
        this.voltageLookupTable2.set(1.467, 0x45);
        this.voltageLookupTable2.set(1.488, 0x44);
        this.voltageLookupTable2.set(1.509, 0x43);
        this.voltageLookupTable2.set(1.531, 0x42);
        this.voltageLookupTable2.set(1.554, 0x41);
        this.voltageLookupTable2.set(1.577, 0x40);
        this.voltageLookupTable2.set(1.6, 0x3F);
        this.voltageLookupTable2.set(1.65, 0x3D);
        this.voltageLookupTable2.set(1.677, 0xC);
        this.voltageLookupTable2.set(1.703, 0x3B);
        this.voltageLookupTable2.set(1.732, 0x3A);
        this.voltageLookupTable2.set(1.761, 0x39);
        this.voltageLookupTable2.set(1.791, 0x38);
        this.voltageLookupTable2.set(1.8, 0x37);
        this.voltageLookupTable2.set(1.821, 0x37);
        this.voltageLookupTable2.set(1.853, 0x36);
        this.voltageLookupTable2.set(1.887, 0x35);
        this.voltageLookupTable2.set(1.921, 0x34);
        this.voltageLookupTable2.set(1.958, 0x33);
        this.voltageLookupTable2.set(1.995, 0x32);
        this.voltageLookupTable2.set(2.034, 0x31);
        this.voltageLookupTable2.set(2.074, 0x30);
        this.voltageLookupTable2.set(2.115, 0x2F);
        this.voltageLookupTable2.set(2.159, 0x2E);
        this.voltageLookupTable2.set(2.205, 0x2D);
        this.voltageLookupTable2.set(2.252, 0x2C);
        this.voltageLookupTable2.set(2.303, 0x2B);
        this.voltageLookupTable2.set(2.355, 0x2A);
        this.voltageLookupTable2.set(2.409, 0x29);
        this.voltageLookupTable2.set(2.466, 0x28);
        this.voltageLookupTable2.set(2.527, 0x27);
        this.voltageLookupTable2.set(2.59, 0x26);
        this.voltageLookupTable2.set(2.656, 0x25);
        this.voltageLookupTable2.set(2.725, 0x24);
        this.voltageLookupTable2.set(2.802, 0x23);
        this.voltageLookupTable2.set(2.879, 0x22);
        this.voltageLookupTable2.set(2.956, 0x21);
        this.voltageLookupTable2.set(3.022, 0x20);
        this.voltageLookupTable2.set(3.029, 0x1F);
        this.voltageLookupTable2.set(3.076, 0x1E);
        this.voltageLookupTable2.set(3.12, 0x1D);
        this.voltageLookupTable2.set(3.16, 0x1C);
        this.voltageLookupTable2.set(3.124, 0x1B);
        this.voltageLookupTable2.set(3.174, 0x1A);
        this.voltageLookupTable2.set(3.225, 0x19);
        this.voltageLookupTable2.set(3.271, 0x18);
        this.voltageLookupTable2.set(3.212, 0x17);
        this.voltageLookupTable2.set(3.282, 0x16);
        this.voltageLookupTable2.set(3.349, 0x15);
        this.voltageLookupTable2.set(3.408, 0x14);
        this.voltageLookupTable2.set(3.328, 0x13);
        this.voltageLookupTable2.set(3.424, 0x12);
        this.voltageLookupTable2.set(3.506, 0x11);
        this.voltageLookupTable2.set(3.573, 0x10);
        this.voltageLookupTable2.set(3.485, 0xF);
        this.voltageLookupTable2.set(3.579, 0xE);
        this.voltageLookupTable2.set(3.686, 0xD);
        this.voltageLookupTable2.set(3.754, 0xC);
        this.voltageLookupTable2.set(3.684, 0xB);
        this.voltageLookupTable2.set(3.798, 0xA);
        this.voltageLookupTable2.set(3.885, 0x9);
        this.voltageLookupTable2.set(3.952, 0x8);
        this.voltageLookupTable2.set(3.906, 0x7);
        this.voltageLookupTable2.set(4.02, 0x6);
        this.voltageLookupTable2.set(4.12, 0x5);
        this.voltageLookupTable2.set(4.21, 0x4);
        this.voltageLookupTable2.set(4.2, 0x3);
        this.voltageLookupTable2.set(4.34, 0x2);
        this.voltageLookupTable2.set(4.35, 0x1);
        this.voltageLookupTable2.set(4.33, 0x0);
        //end Region

//region Voltage Table3 for Version 4 Board
// First range: 0.640 to 1.290 with step size of 0.005
let index = 0;
let stepSize = 0;
for (index = 0, stepSize = 0; index <= 128; index++) {
    const key = Math.round((0.640 + stepSize) * 1000) / 1000; // Rounding to 3 decimal places
    this.voltageLookupTable3.set(key, index);
    stepSize += 0.005;
}

// Second range: 1.290 to 1.980 with step size of 0.010
stepSize = 0;
for (; index <= 195; index++) {
    const key = Math.round((1.290 + stepSize) * 1000) / 1000; 
   this. voltageLookupTable3.set(key, index);
    stepSize += 0.010;
}

// Third range: 1.980 to 4.750 with step size of 0.030
stepSize = 0;
for (; index <= 244; index++) {
    const key = Math.round((1.980 + stepSize) * 1000) / 1000; // Rounding to 3 decimal places
    this.voltageLookupTable3.set(key, index);
    stepSize += 0.030;
}

// Fourth range: 4.750 to 4.800 with step size of 0.050
stepSize = 0;
for (; index <= 255; index++) {
    const key = Math.round((4.750 + stepSize) * 1000) / 1000; // Rounding to 3 decimal places
   this. voltageLookupTable3.set(key, index);
    stepSize += 0.050;
} }
   
    
 public   getAddNodeBytes(node: NodeStructure): Uint8Array {
    const byteList: number[] = [];
    byteList.push(17); // [42] Exerciser Node Packet - 17
    byteList.push(0);  // [43]
    byteList.push(0);  // [44]
   
    if (node.termination === eTerminationType.ON) {
        console.log(node.nodeType);
        console.log(node.triggerSelection);
        console.log(node.slaveVersion);
        byteList.push(
            (this.getNodeValue(node.nodeType) << 5) |
            (0x01 << 3) |
            (Number(node.triggerSelection) << 2) |
            (node.slaveVersion << 1) |
            0x0
           
        ); // [45]
    } else {
      
        byteList.push(
            (this.getNodeValue(node.nodeType) << 5) |
            (0x01 << 3) |
          ( Number(node.triggerSelection) << 2) |
            (node.slaveVersion << 1) |
            0x1
        ); // [45]
    }

    byteList.push(node.nodeId ?? 0); // Use 0 if nodeId is undefined // [46]
    byteList.push(node.BCR); // [47]

    if (node.DCR === eDCR.Custom) {
        byteList.push(parseInt(node.reservedDCR, 16));
    } else {
        byteList.push(node.DCR); // [48]
    }

    byteList.push(0); // [49] - LVR need to be implemented

    let addrType: number = eI2CAddressType._7bAddress;
    let sAddr = 0;

    if (node.nodeType === eNodeType.Master) {
        byteList.push(0); // [50] - static address
    } else {
        sAddr =this.GetI2CAddress(node.staticAddress, addrType);
        sAddr = node.spikeFilterEnable ? ((1 << 7) | sAddr) : sAddr; //check again
        byteList.push(sAddr & 0xFF); // [50] - slave static address
    }

    byteList.push(0);                    // [51] - node memory size needs to be implemented
    let bigIntPID = BigInt(node.PID);

    byteList.push(Number(bigIntPID & BigInt(0xFF)));                 //52
    byteList.push(Number((bigIntPID >> BigInt(8)) & BigInt(0xFF)));  // 53
    byteList.push(Number((bigIntPID >> BigInt(16)) & BigInt(0xFF))); // 54
    byteList.push(Number((bigIntPID >> BigInt(24)) & BigInt(0xFF))); // 55
    byteList.push(Number((bigIntPID >> BigInt(32)) & BigInt(0xFF))); // 56
    byteList.push(Number((bigIntPID >> BigInt(40)) & BigInt(0xFF))); // 57

    byteList.push(0x10); // [58] start address
    byteList.push(0x7B); // [59] stop address
    byteList.push(4);    // [60] - node capability - need to be implemented on further development in HW


  //line 61 volt settings   
// if (SessionConfiguration.PCBboard === eBoard.HWBoard1_0)//Hardwawre version > 0x10 voltages take from table 2 else table1
//      {
//     if (this.voltageLookupTable1.has(node.voltage)) {
//         byteList.push(this.voltageLookupTable1.get(node.voltage)!);
//     } else {
//           //if key does not exist Search for nearest keys in Dictionary
//         const nearestKey = this.findNearestKey(this.voltageLookupTable1, node.voltage);
//         byteList.push(this.voltageLookupTable1.get(nearestKey) ?? 0);
//     }
// } else if (SessionConfiguration.PCBboard === eBoard.HWBoard2_0) {
    if (this.voltageLookupTable2.has(node.voltage)) {
        byteList.push(this.voltageLookupTable2.get(node.voltage)!);
    } else {
          //if key does not exist Search for nearest keys in Dictionary
        const nearestKey = this.findNearestKey(this.voltageLookupTable2, node.voltage);
        byteList.push(this.voltageLookupTable2.get(nearestKey) ?? 0);
    }
// } else {
//     if (this.voltageLookupTable3.has(node.voltage)) {
//         byteList.push(this.voltageLookupTable3.get(node.voltage)!);
//     } else {
//           //if key does not exist Search for nearest keys in Dictionary
//         const nearestKey = this.findNearestKey(this.voltageLookupTable3, node.voltage);
//         byteList.push(this.voltageLookupTable3.get(nearestKey) ?? 0);
//     }
// }
   //Removed expression for calculating voltage moved to lookup table
   //byteList.Add(Convert.ToByte((3.3 - node.Voltage) * 1000 / 50)); //[61] - voltage settings
  
  
  if (node.nodeType === eNodeType.I2C_Slave && addrType === eI2CAddressType._10bAddress ) {
        byteList.push(0x80 | ((sAddr >> 7) & 0x7)); // [62]
    } else {
        byteList.push(0); // [62]
    }

    byteList.push(0); // [63]
    byteList.push(0); // [64]
    byteList.push(0); // [65]

    if (node.nodeType === eNodeType.I2C_Slave) {
        byteList.push(node.MWL >> 8); // [66]
        byteList.push(node.MWL & 0xFF); // [67]
    } else {
        byteList.push(0); // [66]
        byteList.push(0x10); // [67]
    }

    byteList.push(node.MRL >> 8); // [68]
    byteList.push(node.MRL & 0xFF); // [69]
    byteList.push(0); // [70]
    byteList.push(0); // [71]
    byteList.push(0); // [72]
    byteList.push(0); // [73]
    byteList.push(0); // [74]
    byteList.push(0); // [75]
    byteList.push(0); // [76]
    byteList.push(0x03); // [77]
    byteList.push(0x3); // [78]
    byteList.push(0x3); // [79]
    byteList.push(0xFA); // [80]
    byteList.push(0); // [81]

    // Update length field
    byteList[1] = byteList.length - 22;

    console.log(byteList);
    return new Uint8Array(byteList);
}

public  getNodeValue(node: eNodeType): number {
    switch (node) {
        case eNodeType.Master:
            return 1;
        case eNodeType.Sec_Master:
            return 2;
        case eNodeType.I3C_Slave:
            return 2;
        case eNodeType.I2C_Slave:
            return 3;
        default:
            return 0;
    }
}




public GetI2CAddress(address: string | null, type:number ) {
    let returnAddress = 0;
 

    if (address) {
        const splitAddress = address.split('h');
        type = eI2CAddressType._7bAddress;

        if (splitAddress.length === 2) {
            switch (splitAddress[0]) {
                case "7":
                    type = eI2CAddressType._7bAddress;
                    break;
                case "8":
                    type = eI2CAddressType._8bAddress;
                    break;
                case "10":
                    type = eI2CAddressType._10bAddress;
                    break;
            }
            returnAddress = parseInt(splitAddress[1], 16);
        } else if (splitAddress.length === 1) {
            type = eI2CAddressType._7bAddress;
            returnAddress = parseInt(address, 16);
        }
    } else {
        type = eI2CAddressType._7bAddress;
    }

    return  returnAddress ;
}

public findNearestKey(lookupTable: Map<number, number>, voltage: number): number {
    const sortedKeys = Array.from(lookupTable.keys()).sort((a, b) => a - b);
    const index = sortedKeys.findIndex(key => key >= voltage);
    return index >= 0 ? sortedKeys[index] : sortedKeys[sortedKeys.length - 1]; // Fallback to the last key
}




// // function GetMasterScriptBytes(scriptList: IScript[]): number[][] {
//     const scriptBytes: number[][] = [];
//     const protocolByte: number[] = [];
//     const currentByte: number[] = [];
//     let seqNum = 0;

//     protocolByte.push(...GetHeaderPacket('MasterScript', 0));

//     const tIMGAll = scriptList.find(
//         (x) => x.ScriptType === 'Sys' && (x as SysCreator).UniversaltIMGEnable === true
//     ) as SysCreator | undefined;

//     const tIMGbytes: number[] = tIMGAll ? GetSysBytes(tIMGAll) : [];

//     const ScalingFactor = scriptList.find(
//         (t) => t.ScriptType === 'ScalingFactor'
//     ) as ScalingFactorCreater | undefined;

//     if (ScalingFactor) {
//         for (const Sysscript of scriptList) {
//             if (Sysscript.ScriptType === 'ScalingFactor') continue;

//             if (Sysscript.ScriptType === 'Sys' || Sysscript.ScriptType === 'SysOD') {
//                 // Adjust frequency based on ScalingFactor
//                 (Sysscript as SysCreator).Freq = (Sysscript as SysCreator).Freq === -1
//                     ? (Sysscript as SysCreator).Freq
//                     : (Sysscript as SysCreator).Freq / ScalingFactor.Scale;

//                 if ((Sysscript as SysCreator).Freq !== 0) {
//                     (Sysscript as SysCreator).HighTime = (Sysscript as SysCreator).HighTime;
//                     (Sysscript as SysCreator).LowTime = 100 - (Sysscript as SysCreator).HighTime;
//                 } else {
//                     (Sysscript as SysCreator).HighTime = (Sysscript as SysCreator).HighTime === -1
//                         ? (Sysscript as SysCreator).HighTime
//                         : (Sysscript as SysCreator).HighTime * ScalingFactor.Scale;

//                     (Sysscript as SysCreator).LowTime = (Sysscript as SysCreator).LowTime === -1
//                         ? (Sysscript as SysCreator).LowTime
//                         : (Sysscript as SysCreator).LowTime * ScalingFactor.Scale;
//                 }

//                 (Sysscript as SysCreator).TCO; // Assuming TCO doesn't need adjustment

//                 (Sysscript as SysCreator).tSU = (Sysscript as SysCreator).tSU === -1
//                     ? (Sysscript as SysCreator).tSU
//                     : (Sysscript as SysCreator).tSU * ScalingFactor.Scale;

//                 (Sysscript as SysCreator).tCAS; // Assuming tCAS doesn't need adjustment
//             } else if (Sysscript.ScriptType === 'SysExtended') {
//                 (Sysscript as SysExtendedCreator).tSU_STA = isNaN((Sysscript as SysExtendedCreator).tSU_STA)
//                     ? (Sysscript as SysExtendedCreator).tSU_STA
//                     : (Sysscript as SysExtendedCreator).tSU_STA * ScalingFactor.Scale;

//                 (Sysscript as SysExtendedCreator).tSU_STO = isNaN((Sysscript as SysExtendedCreator).tSU_STO)
//                     ? (Sysscript as SysExtendedCreator).tSU_STO
//                     : (Sysscript as SysExtendedCreator).tSU_STO * ScalingFactor.Scale;

//                 (Sysscript as SysExtendedCreator).tSU_DAT = isNaN((Sysscript as SysExtendedCreator).tSU_DAT)
//                     ? (Sysscript as SysExtendedCreator).tSU_DAT
//                     : (Sysscript as SysExtendedCreator).tSU_DAT * ScalingFactor.Scale;
//             }
//         }
//     }

//     for (const script of scriptList) {
//         if (script.ScriptType === 'ScalingFactor') continue;

//         if (tIMGbytes.length > 0) {
//             currentByte.push(...tIMGbytes);
//         }
//         if (script.ScriptType === 'Sys' && script !== tIMGAll) {
//             currentByte.push(...GetSysBytes(script));
//             seqNum++;
//         } else if (script.ScriptType === 'SysExtended') {
//             currentByte.push(...GetExtendedSysBytes(script));
//             seqNum++;
//         } else if (script.ScriptType === 'CTS' || script.ScriptType === 'ExtendedErrors') {
//             currentByte.push(...GetCTSbytes(script));
//         } else if (script.ScriptType === 'Bus') {
//             if (script instanceof MasterMessageCreator && (script as MasterMessageCreator).FrameType === 'IBI_Response') {
//                 protocolByte[0] = 24; // Change packet type to differentiate.
//                 continue;
//             }

//             if (script instanceof MasterMessageCreator && (
//                 (script as MasterMessageCreator).FrameType === 'HDRExitPattern' ||
//                 (script as MasterMessageCreator).FrameType === 'SlaveResetPattern' ||
//                 (script as MasterMessageCreator).FrameType === 'Test_Pattern' ||
//                 (script as MasterMessageCreator).FrameType === 'Ext_DUT' ||
//                 (script as MasterMessageCreator).FrameType === 'GLITCH_Generator')) {
//                 protocolByte.push(...currentByte);
//                 currentByte.length = 0;

//                 if (protocolByte.length >= 22) {
//                     const packetLength = protocolByte.length - 22;
//                     protocolByte[1] = packetLength & 0xFF;
//                     protocolByte[2] = (packetLength >> 8) & 0xFF;

//                     scriptBytes.push(protocolByte.slice());
//                     scriptBytes.push(GetHeaderPacket('StartStop', 0));
//                     protocolByte.length = 0;
//                 }

//                 if ((script as MasterMessageCreator).FrameType === 'SlaveResetPattern') {
//                     scriptBytes.push(GetSlaveResetPattern());
//                 } else if ((script as MasterMessageCreator).FrameType === 'HDRExitPattern') {
//                     scriptBytes.push(GetHDRExitPattern());
//                 } else if ((script as MasterMessageCreator).FrameType === 'Ext_DUT') {
//                     scriptBytes.push(GetExtDUTPacket((script as MasterMessageCreator).IsLogicEnable));
//                 } else if ((script as MasterMessageCreator).FrameType === 'GLITCH_Generator') {
//                     scriptBytes.push(GetGLitchPacket(script as MasterMessageCreator));
//                 } else {
//                     scriptBytes.push(GetTestPattern((script as MasterMessageCreator).CTSNonstandadFormat));
//                 }

//                 protocolByte.length = 0;
//                 currentByte.push(...GetHeaderPacket('StartStop', 0));
//                 currentByte[currentByte.length - 1] = 0xF0;
//                 scriptBytes.push(currentByte.slice());
//                 currentByte.length = 0;
//                 protocolByte.push(...GetHeaderPacket('MasterScript', 0));
//             } else {
//                 if (script instanceof DDRMessageCreator && (script as DDRMessageCreator).HasFramingTokenError) {
//                     currentByte.push(...GetCTSbytesForDDRFramingToken(script));
//                 }

//                 currentByte.push(...GetMasterPacketBytes(script as IScript));
//                 seqNum++;
//             }
//         } 
//         else if (script.ScriptType === 'Loop') {
//             const loopObj = script as LoopCreator;
//             const loopCount = loopObj.LoopCount;
//             if (loopObj.Freq === 0) {
//                 for (let loopIndex = 0; loopIndex < loopCount && loopIndex < 255; loopIndex++) {
//                     protocolByte.push(...currentByte);
//                 }
//             } else {
//                 const sys = {
//                     LowTime: 50,
//                     HighTime: 50,
//                     TCO: 10,
//                     tSU: 0,
//                     tIMG: 17,
//                     ResImg: 'us',
//                     Freq: 0,
//                 } as SysCreator;

//                 const freq = loopObj.Freq;
//                 for (let loopIndex = 0; loopIndex < loopCount && loopIndex < 255 && sys.Freq <= 12500; loopIndex++) {
//                     sys.Freq = loopObj.Freq + (loopObj.Factor * loopIndex);
//                     protocolByte.push(...GetSysBytes(sys));
//                     seqNum++;
//                     protocolByte.push(...currentByte);
//                     if (protocolByte.length > 4000) {
//                         const packetLength = protocolByte.length - 22;
//                         protocolByte[1] = packetLength & 0xFF;
//                         protocolByte[2] = (packetLength >> 8) & 0xFF;
//                         scriptBytes.push(protocolByte.slice());
//                         scriptBytes.push(GetHeaderPacket('StartStop', 0));
//                         protocolByte.length = 0;
//                         protocolByte.push(...GetHeaderPacket('MasterScript', 0));
//                     }
//                 }
//             }
//             currentByte.length = 0;
//         }
//     }

//     if (currentByte.length > 0) {
//         protocolByte.push(...currentByte);
//         currentByte.length = 0;
//     }

//     if (protocolByte.length > 22) {
//         const packetLength = protocolByte.length - 22;
//         protocolByte[1] = packetLength & 0xFF;
//         protocolByte[2] = (packetLength >> 8) & 0xFF;
//         scriptBytes.push(protocolByte.slice());
//         scriptBytes.push(GetHeaderPacket('StartStop', 0));
//         protocolByte.length = 0;
//     }

//     return scriptBytes;
// }














}