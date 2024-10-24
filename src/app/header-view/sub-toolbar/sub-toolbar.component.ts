import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {  SystemStates, SystemStatusUpdate } from '../../../../.generated/protos/CommonTypes';
import { ProtoService } from '../../service/proto.service';
import { CommonService } from '../../service/commonType.service';
import { delay, Subscription } from 'rxjs';
import { ipcRenderer, IpcRenderer } from 'electron';
import { OfflineService } from '../../service/offline.service';
import { RouterLink } from '@angular/router';
import { OnlineService } from '../../service/online.service';
import { SessionConfiguration } from '../../structure/sessionConfiguration';
import { eResponseFlag } from '../../enums/enum';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-sub-toolbar',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
  RouterLink],
  templateUrl: './sub-toolbar.component.html',
  styleUrl: './sub-toolbar.component.css'
})
export class SubToolbarComponent {

  toggleDarkMode(event: any) {
    const isChecked = event.target.checked;
    document.body.classList.toggle('dark-mode', isChecked);
    localStorage.setItem('dark-mode', isChecked ? 'enabled' : 'disabled');
    console.log(`Dark mode ${isChecked ? 'enabled' : 'disabled'}`);
  }
  
  

  private ipcRenderer: IpcRenderer |undefined;
  totalmessagesload: number=0;
  currentStatus: SystemStatusUpdate | null = null;
  messagesSubscription: Subscription |null=null;
  selectedPath: string = '';
  constructor(private commonService: CommonService, private protoService: ProtoService, private offlineservice: OfflineService,private onlineservice:OnlineService) {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }
  
  ngOnInit(): void {
    this.subscribeToStatus();

    // Apply saved dark mode preference
  const darkMode = localStorage.getItem('dark-mode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    const themeSwitch = document.getElementById('theme-switch') as HTMLInputElement;
    if (themeSwitch) {
      themeSwitch.checked = true;
    }
  }
}

isElectron(): boolean {
  return !!(window && window.process && window.process.type);
}


private subscribeToStatus(): void {
    this.protoService.status$.subscribe(status => {
        this.currentStatus = status;
         console.log('Current status:', status);

         if(this.currentStatus?.currentState==1)
          alert("Connection with server Successfull ✅ ");
    });
}



  openFileDialog() {
    console.log('opening file dailog');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }

  
  }



  async handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const directoryPath = input.files[0].webkitRelativePath || input.files[0].name;
  
      try {
        await this.InitializeMethod(directoryPath);
        console.log('File initialization sequence completed successfully.');
      } catch (error) {
        console.error('Error during file handling:', error);
      }
    }
  }
  


  async openDirectoryDialog() {
    console.log('Opening directory dialog');
    if (this.ipcRenderer) {

      this.ipcRenderer.invoke('open-directory-dialog').then((result: string[]) => {
        if (result && result.length > 0) {
          console.log('Selected directory path:', result[0]);
          this.selectedPath = result[0];
         this. InitializeMethod(result[0]);
        }
      });
  }}
  async InitializeMethod(path: string) {
  
        const directoryPath=path;
        console.log(`Simulated directory path: ${directoryPath}`);

        try {
          await this.initialize(directoryPath);
          console.log('setup & Initialization sequence completed successfully.');

          await this.offlineservice.startrun();

          await this.waitForState(SystemStates.StartRun);
          console.log('current status is StartRun.......');
        
          await this.waitForState(SystemStates.RunCompleted);
          console.log('Decode completed : Frame Decoded :Current status: RUNCOMPLETED');
          alert("Run completed...");
         
         
        

        } catch (error) {
          console.error('Error during initialization sequence:', error);
        }
    
  }

  private async waitForState(targetState: SystemStates): Promise<void> {
    while (this.currentStatus == null || this.currentStatus.currentState !== targetState) {
      console.log(`Waiting for system to be in state: ${targetState}...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
    }
  }

  async initialize(directoryPath: string): Promise<void> {
    try {
      await this.waitForState(SystemStates.Ready);


      console.log('Sending setup system message...');
      await this.offlineservice.sendSetupSystemMessage();
      console.log('Setup system message sent successfully.');

       await this.waitForState(SystemStates.Setup);
 
      console.log('Sending initialize run message...');
      await this.offlineservice.sendInitializeRunMessage(directoryPath);
      console.log('Initialize run message sent successfully.');

       await this.waitForState(SystemStates.InitializeRun);

  
    } catch (error) {
      console.error('Error in initialize function:', error);
      throw error;
    }
  }



  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 
  async ConnectionMethod(): Promise<void> {
    try {
      await this.waitForState(SystemStates.Ready);
  
      await this.onlineservice.launchCaptureApp();
       await this.delay(2000);
  
      console.log('Sending setup system message...');
      await this.onlineservice.sendSetupSystemMessageLive();
      console.log('Setup system message sent successfully.');
     
      await this.waitForState(SystemStates.Setup);
      //alert("l0");
      console.log('Sending device setup system message...');
      await this.onlineservice.sendSetupDeviceSystemMessage();
      console.log('Device setup system message sent successfully.');
  
      await this.waitForState(SystemStates.SetupDevice);
      // alert("l1");
     
      await this.handleStatusUpdate();
  
    } catch (error) {
      console.error('Error in initialize function:', error);
      throw error;
    }
  }
  
  
  
 

  private async handleStatusUpdate(): Promise<eResponseFlag> {
    try {
      const status = await firstValueFrom(this.protoService.status$);
  
      let setUpStatus: eResponseFlag = eResponseFlag.No_Result;
  
      if (status && status.currentState === SystemStates.SetupDevice) {
        setUpStatus = eResponseFlag.Success;
      } else if (status && status.reason) {
        setUpStatus = eResponseFlag.FX3Fail;
      } else {
        setUpStatus = eResponseFlag.Application_Exception;
      }
  
      console.log('Setup status:', setUpStatus);
  
      switch (setUpStatus) {
        case eResponseFlag.Success:
          {
            SessionConfiguration.ConnectionStatus = true;
            alert("USB Connection, Connection Established Successfully ✅");
          }
          break;
        case eResponseFlag.FX3Fail:
          {
            alert("USB Connection: FX3 not detected");
            return eResponseFlag.FX3Fail;
          }
        default:
          {
            alert("USB Connection: Device Not Found");
            return eResponseFlag.Application_Exception;
          }
      }
      return setUpStatus;
    } catch (error) {
      console.error('Error handling status update:', error);
      return eResponseFlag.Application_Exception;
    }
  }
  
  


  async RunStopMethod(): Promise<void> {
    try {
     
      await this.waitForState(SystemStates.SetupDevice);
 

      console.log('Sending initialize run message...');
      await this.onlineservice.sendInitializeRunMessage();
      console.log('Initialize run message sent successfully.');

       await this.waitForState(SystemStates.InitializeRun);
       console.log('setup & Initialization sequence completed successfully.');
        // alert("L3");
       await this.onlineservice.startrun();

       await this.waitForState(SystemStates.StartRun);
       console.log('current status is StartRun.......');
      
       alert("Capture Started...");
      //  await this.waitForState(SystemStates.RunCompleted);
      //  console.log('Decode completed : Frame Decoded :Current status: RUNCOMPLETED');
      //  alert("Run completed...");

      //  await this.waitForState(SystemStates.StopRun);
  
    } catch (error) {
      console.error('Error in initialize function:', error);
      throw error;
    }
  }
}






