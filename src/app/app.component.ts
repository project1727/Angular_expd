import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderViewComponent } from "./header-view/header-view.component";
import { BodyViewComponent } from "./body-view/body-view.component";
import { FooterViewComponent } from "./footer-view/footer-view.component";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProtoService } from './service/proto.service';
import { ConnectMessage } from '../../.generated/protos/ProtoService';
import { SystemStatusUpdate } from '../../.generated/protos/CommonTypes';
import { delay } from 'rxjs';
import { HardwareFactoryConverterService } from './service/HardwareFactoryConverter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet, HeaderViewComponent, BodyViewComponent, FooterViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PGY-I3C-EXPD';
  currentStatus: SystemStatusUpdate | null = null;
  constructor(private protoService: ProtoService) {

  }

  ngOnInit(): void {
  
    this.connectToServer();
 
  }


  private username: string="EXPD";
  private appServerAddress: string='127.0.0.1:5702';
  private isAnalyzer: boolean=false;
    
  async connectToServer() {
 
    const connectMessage = ConnectMessage.create();
    connectMessage.userName = this.username;
    connectMessage.appServerAddress = this.appServerAddress;
    connectMessage.isAnalyzer = this.isAnalyzer;

    var ConnectionStatus = await this.protoService.connect(connectMessage);
    
      if(ConnectionStatus.isConnected) {
        this.protoService.startListeningToEvent_statusUpdate();
        console.log('Connected:', ConnectionStatus);
        

      } else {
        console.error('Error connecting.');
        alert("Not Connected");
      }
  };
}