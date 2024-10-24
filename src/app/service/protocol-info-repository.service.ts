import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { eCommandPattern, eMajorFrame, eTransferType } from '../enums/enum';

export interface MIPIMember {
  id: number;
  name: string;
}

class CommandInfo {
  public IsDataLimited ?: boolean;
  public TransferType?: eTransferType;
  public DataCount?: number;
  public HasData?: boolean;
  public hasPECWithoutData?: boolean;
  public hasMultiplePattern?: boolean;
  public Pattern ?:eCommandPattern;
  constructor(init?: Partial<CommandInfo>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProtocolInfoRepositoryService {
  private mipiMemberInfo: BehaviorSubject<MIPIMember[]> = new BehaviorSubject<MIPIMember[]>([]);
  private commandDirectory: Record<number, CommandInfo> = {}; 

  constructor() {
    this.createMemberInfo();
    this.createCommandInfo(); // Ensure command info is created in the constructor
  }

  getMemberInfo(): Observable<MIPIMember[]> {
    return this.mipiMemberInfo.asObservable();
  }

  private createMemberInfo(): void {
    fetch('/assets/data/MIPIMember_Table.csv')
      .then(response => response.text())
      .then(data => {
        const mipiMembers: MIPIMember[] = [];
        const lines = data.split('\n');
        lines.forEach(line => {
          const values = line.split(',');
          const intValue = parseInt(values[0], 16);
          mipiMembers.push({ id: intValue, name: values[1] });
        });
        this.mipiMemberInfo.next(mipiMembers);
      })
      .catch(error => {
        console.error("Error loading member info:", error);
      });
  }

  getI2CAddress(address: string): number {
    let returnAddress = 0;
    let type = '7b';

    if (address) {
      const splitAddress = address.split('h');

      if (splitAddress.length === 2) {
        switch (splitAddress[0]) {
          case "7":
            type = '7b';
            break;
          case "8":
            type = '8b';
            break;
          case "10":
            type = '10b';
            break;
        }
        returnAddress = parseInt(splitAddress[1], 16);
      } else if (splitAddress.length === 1) {
        type = '7b'; // Default to 7-bit Address
        returnAddress = parseInt(address, 16);
      }
    }

    return returnAddress;
  }

  private createCommandInfo(): void {
 
    this.commandDirectory[eMajorFrame.Broadcast_ENEC] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: true, DataCount: 1 });
    this.commandDirectory[eMajorFrame.Broadcast_DISEC] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: true, DataCount: 1 });
    this.commandDirectory[eMajorFrame.Broadcast_ENTAS0] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTAS1] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTAS2] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTAS3] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_RSTDAA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false, hasPECWithoutData: true });
    this.commandDirectory[eMajorFrame.Broadcast_ENTDAA] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 9 });
    this.commandDirectory[eMajorFrame.Broadcast_SETMWL] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Broadcast_SETMRL] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Broadcast_DEFSLVS] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 4, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTTM] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: true, DataCount: 1 });
    this.commandDirectory[eMajorFrame.Broadcast_SETBUSCON] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR0] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR1] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR2] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR3] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR4] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR5] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR6] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENTHDR7] = new CommandInfo({ TransferType: eTransferType.Both, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_SETXTIME] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Broadcast_SETAASA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_RSTACT] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });
    this.commandDirectory[eMajorFrame.Broadcast_SETHID] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });
    this.commandDirectory[eMajorFrame.Broadcast_DEVCTRL] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });
    this.commandDirectory[eMajorFrame.Broadcast_DEFGRPA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 4, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Broadcast_ENDXFER] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });
    this.commandDirectory[eMajorFrame.Broadcast_RSTGRPA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Broadcast_MLANE] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true });

    this.commandDirectory[eMajorFrame.Directed_ENEC] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: true, DataCount: 1 });
    this.commandDirectory[eMajorFrame.Directed_DISEC] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: true, DataCount: 1 });
    this.commandDirectory[eMajorFrame.Directed_ENTAS0] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Directed_ENTAS1] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Directed_ENTAS2] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Directed_ENTAS3] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false });
    this.commandDirectory[eMajorFrame.Directed_RSTDAA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: false, hasPECWithoutData: true });
    this.commandDirectory[eMajorFrame.Directed_GETMWL] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_SETMWL] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETMRL] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_SETMRL] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_SETDASA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_SETNEWDA] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETPID] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 6, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETBCR] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETDCR] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETSTATUS] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 2, IsDataLimited: true, hasMultiplePattern: true, Pattern: eCommandPattern.B });
    this.commandDirectory[eMajorFrame.Directed_GETACCMST] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 2, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_SETBRGTGT] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, IsDataLimited: false });
    this.commandDirectory[eMajorFrame.Directed_GETMXDS] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 2, IsDataLimited: true, hasMultiplePattern: true, Pattern: eCommandPattern.B });
    this.commandDirectory[eMajorFrame.Directed_GETCAPS] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 1, IsDataLimited: true, hasMultiplePattern: true, Pattern: eCommandPattern.B });
    this.commandDirectory[eMajorFrame.Directed_SETXTIME] = new CommandInfo({ TransferType: eTransferType.Write, HasData: true, DataCount: 1, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_GETXTIME] = new CommandInfo({ TransferType: eTransferType.Read, HasData: true, DataCount: 4, IsDataLimited: true });
    this.commandDirectory[eMajorFrame.Directed_DEVCAP] = new CommandInfo({ TransferType:eTransferType.Read,HasData:true});

    this.commandDirectory[eMajorFrame.Directed_RSTACT] = new CommandInfo({ TransferType : eTransferType.Read, HasData : true, hasMultiplePattern : true, Pattern : eCommandPattern.B});
    this.commandDirectory[eMajorFrame.Directed_D2DXFER] = new CommandInfo({ TransferType : eTransferType.Write, HasData : true, hasMultiplePattern : true, Pattern : eCommandPattern.B});
    this.commandDirectory[eMajorFrame.Directed_ENDXFER] = new CommandInfo({ TransferType : eTransferType.Read, HasData : true, hasMultiplePattern : true, Pattern : eCommandPattern.B});
    this.commandDirectory[eMajorFrame.Directed_SETGRPA] = new CommandInfo({ TransferType : eTransferType.Write, HasData : true, DataCount:1,IsDataLimited:true});
    this.commandDirectory[eMajorFrame.Directed_RSTGRPA] = new CommandInfo({ TransferType : eTransferType.Write, HasData : false});
    this.commandDirectory[eMajorFrame.Directed_MLANE] = new CommandInfo({ TransferType : eTransferType.Write, HasData : true, hasMultiplePattern : true, Pattern : eCommandPattern.B});
}

public getCommandInfo(command: number): CommandInfo {
  if (command in this.commandDirectory) {
      return this.commandDirectory[command];
  } else {
      return new CommandInfo(); 
  }
}
}
