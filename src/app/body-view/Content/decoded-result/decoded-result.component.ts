import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, IDatasource, IGetRowsParams, GridApi,RowSelectedEvent  } from 'ag-grid-community';
import { TimestampCellRendererComponent } from '../../../RendererComponent/TimestampCellRendererComponent';
import { EnumToStringCellRendererComponent } from '../../../RendererComponent/EnumToStringCellRendererComponent';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProtoService } from '../../../service/proto.service';
import { MessagesAvailableResponse } from '../../../../../.generated/protos/DecoderTypes';
import { from } from 'rxjs';
import { ErrorType, FrameType, HostDeviceType, PacketType, ProtocolMode, ProtocolTypee, StartType } from '../../../../../.generated/protos/I3CFrame';
import { DecimalToHexCellRendererComponent } from '../../../RendererComponent/decimalToHexRendererComponent';
@Component({
  selector: 'app-decoded-result',
  standalone: true,
  imports: [ AgGridAngular,MatGridListModule],
  templateUrl: './decoded-result.component.html',
  styleUrl: './decoded-result.component.css'
})
export class DecodedResultComponent {


  toggleSearch(e: Event) {
    const button = (e.target as Element).closest('button') as HTMLButtonElement;
    button.classList.toggle('active');
    document.querySelector('.mod-table__search--decode')?.classList.toggle('active');
  }

  columnDefs: ColDef[] = [
    { field: 'frameIndex', headerName: 'S.No', width: 80 },
    { field: 'protocol', headerName: 'Protocol', width: 100, 
      cellRenderer: EnumToStringCellRendererComponent,
      cellRendererParams: { enumType: ProtocolTypee }
    },
    { field: 'startTime', headerName: 'StartTime', width: 100, 
      cellRenderer: TimestampCellRendererComponent },
    { field: 'stopTime', headerName: 'StopTime', width: 100, 
      cellRenderer: TimestampCellRendererComponent },
    { field: 'frameType', headerName: 'Message', width :160, 
      cellRenderer: EnumToStringCellRendererComponent,
      cellRendererParams: { enumType: FrameType }
    },
    { field: 'errorType', headerName: 'Error Type', width: 150, 
      cellRenderer: EnumToStringCellRendererComponent, 
      cellRendererParams: { enumType: ErrorType }
    }
  ];

  // packetColumnDefs: ColDef[] = [
  
  //   { field: 'startTime', headerName: 'Time', width: 120 },
  //   { field: 'packets.packet', headerName: 'Packet Type', width: 150 },
  //   { field: 'packet.address.addressValue', headerName: 'Value', width: 150 },
  //   { field: 'packet.address.hostDevice', headerName: 'Host', width: 150 },
  //   { field: 'packet.frequency', headerName: 'Frequency', width: 150 }, // You can adjust this based on where frequency is located.
  //   { field: 'packet.protocolMode', headerName: 'Protocol', width: 150 },
  //   { field: 'packet.errorType', headerName: 'Error', width: 150 }
  // ];

  packetColumnDefs: ColDef[] = [
    // { field: 'startTime', headerName: 'Time', width: 120 },

    {
      headerName: 'Time',
      width: 90,
      valueGetter: (params) => {
     
        const packet = params.data.packet;
        switch (packet.oneofKind) {
          case 'start':
            return packet.start.startInterval.startTime;
          case 'address':
            return packet.address.addressInterval.startTime;
           case 'command':
            return packet.command.commandInterval.startTime;
            case 'data':
              return packet.data.dataInterval.startTime;
          case 'stop':
            return packet.stop.stopInterval.startTime;
          // default:
          //   return 'Unknown';
        }
      },
       cellRenderer: TimestampCellRendererComponent 
    },

    {
      
        headerName: 'PacketType',
        width: 100,
        valueGetter: (params) => {
          const packet = params.data.packet;
          switch (packet.oneofKind) {
            case 'start':
              return packet.start?.startType;
            case 'address':
              return packet.address?.packetType;
            case 'command':
              return packet.command?.packetType;
            case 'data':
              return packet.data?.packetType;
            case 'stop':
            return 'Stop';
            default:
              return 'Unknown';
          }
        },
        cellRendererSelector: (params) => {
          const packet = params.data.packet;
          
          if (packet.oneofKind === 'start') {
            return {
              component: EnumToStringCellRendererComponent,
              params: { enumType: StartType },
            };
          }
    
          else  {
            return {
              component: EnumToStringCellRendererComponent,
              params: { enumType: PacketType },
            };
          }
      
      
        }
  
  },
    {
      headerName: 'Value',
      width: 90,
      valueGetter: (params) => {
  
        const packet = params.data.packet;
        switch (packet.oneofKind) {
          case 'start':
            return  ;
          case 'address':
            return packet.address?.addressValue || 'N/A';
          case 'command':
            return packet.command?.commandValue || 'N/A';
            case 'data':
              return packet.data?.dataValue ;
          case 'stop':
            return ; 
          default:
            return 'N/A';
        }
      },
      cellRenderer: DecimalToHexCellRendererComponent,
     
    },
    {
      headerName: 'Host',
      width: 90,
      valueGetter: (params) => {
         const packet = params.data.packet;
        // if (packet.oneofKind === 'address') {
         
       
          switch (packet.oneofKind) {
            case 'start':
              return ;
            case 'address':
              return packet.address?.hostDevice 
            case 'command':
              return packet.command?.hostDevice;
              case 'data':
                return packet.data?.hostDevice;
            case 'stop':
              return packet.address?.hostDevice;
            default:
              return 'Unknown';
          }
      },
      cellRenderer: EnumToStringCellRendererComponent,
      cellRendererParams: { enumType: HostDeviceType }
    },
    {
      headerName: 'Frequency',
      width: 100,
      valueGetter: (params) => {
        const packet = params.data.packet;
 
        switch (packet.oneofKind) {
          case 'start':
            return ;
          case 'address':
            return packet.address?.frequency ;
          case 'command':
            return packet.command?.frequency;
            case 'data':
              return packet.data?.frequency;
          case 'stop':
            return ;
          default:
            return 'Unknown';
        }
      }
    },
    {
      headerName: 'Protocol',
      width: 100,
      valueGetter: (params) => {
        const packet = params.data.packet;
    
        switch (packet.oneofKind) {
          case 'start':
            return ;
          case 'address':
            return packet.address?.protocolMode ;
          case 'command':
            return packet.command?.protocolMode;
            case 'data':
              return packet.data?.protocolMode;
          case 'stop':
            return ;
          default:
            return 'Unknown';
        }
      },
      cellRenderer: EnumToStringCellRendererComponent,
      cellRendererParams: { enumType: ProtocolMode }
    },
    {
      headerName: 'Error',
      width: 150,
      valueGetter: (params) => {
        const packet = params.data.packet;
     
        switch (packet.oneofKind) {
          case 'start':
            return ;
          case 'address':
            return packet.address?.errorType ;
          case 'command':
            return packet.command?.errorType;
            case 'data':
              return packet.data?.errorType;
          case 'stop':
            return ;
          default:
            return 'Unknown';
        }
      },

      cellRenderer: EnumToStringCellRendererComponent, 
      cellRendererParams: { enumType: ErrorType }
    }
  ];
  

  dataSource!: IDatasource;
  gridApi!: GridApi;
  totalMessages: bigint = 0n;
  selectedFrame: any = null;
  selectedPackets: any[] = []; 

  constructor(private protoService: ProtoService) {}

  ngOnInit(): void {    

    this.dataSource = {
      rowCount: -1,
      getRows: (params: IGetRowsParams) => {
        const  startRow = BigInt(params.startRow);
        const endRow = BigInt(params.endRow);
      
        console.log(`getrows: ${startRow}, ${endRow}`);   
      //   console.log(this.totalMessages);
      //  endRow:this.totalMessages;

        if(this.totalMessages > endRow){
       
          params.failCallback();
        }
        else {
          // this.protoService.requestMessages('I3C__1', startRow, endRow - startRow).subscribe(data => {
          //   params.successCallback(data, -1);

            from(this.protoService.requestMessages('I3C__1', startRow, endRow - startRow)).subscribe(data => {              
              params.successCallback(data!, Number(this.totalMessages));
              console.log(data!);
            });
        // });
        }
      }
    };

    this.protoService.messagesAvailable$.subscribe(
      (response: MessagesAvailableResponse | null) => {
        this.totalMessages = response!.totalMessages;
        console.log(`Protocol: ${response!.protocolName}, Messages Available: ${this.totalMessages}`);
        
        if (this.gridApi != null) {          
          console.log(Number(this.totalMessages));
          this.gridApi.setRowCount(Number(this.totalMessages), false);
          this.gridApi.refreshInfiniteCache();
        }
      }, (error) => {
        console.error('Error in messages subscription:', error);
      });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;    
    params.api.sizeColumnsToFit();

    console.log(`onGridReady()`);
  }
  onRowSelected(event: RowSelectedEvent): void {
    if (event.node) {
      this.selectedFrame = event.data; 
      this.selectedPackets = this.selectedFrame?.packets || [];  
      console.log(this.selectedPackets);
  }
 
}
}


