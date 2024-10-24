import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IScriptTranslator } from '../../../../../interfaces/IScriptTranslator.interface ';
import { OnlineService } from '../../../../../service/online.service';
@Component({
  selector: 'app-master-script',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './master-script.component.html',
  styleUrl: './master-script.component.css'
})
export class MasterScriptComponent {
constructor(private onlineService: OnlineService)
{

}

  fileContent: string = ''; 
  fileName: string = ''; 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0]; 
      const reader = new FileReader();
      this.fileName = file.name;
      console.log(this.fileName);
    
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.fileContent = result;
        }
      };

      reader.readAsText(file); 
    }
  }
  public buttonClickHandler(translator: IScriptTranslator): void {
    if (!this.fileContent) {
      console.error('No file content available!');
      return;
    }

   
    let instructionLoader = translator.getPacketsFromText(this.fileContent);

 

  }


  private publishMessage(message: string): void {
    console.log(message); 
  }
  OnbuttonClick()
  {
      const hexArray: number[] = [0x17, 0x00, 0x20, 0x80];
  
  
      let uint8Array = new Uint8Array(hexArray);
  
      const zerosNeeded: number = 8210;
  
      const zerosArray = new Uint8Array(zerosNeeded);
  
  
      const finalArray = new Uint8Array(uint8Array.length + zerosArray.length);
      finalArray.set(uint8Array); 
      finalArray.set(zerosArray, uint8Array.length); 
  
      console.log(finalArray); 
      console.log(finalArray.length); 
  
    
      this.onlineService.publishModifiedScript([finalArray]);
  }
  

  OnbuttonClick1()
{
  if (this.fileName == 'ENTDAA.txt.txt') {
  
    const hexData: number[] = [
        0x12, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x88, 0x00, 0x04, 0xc8,
        0x00, 0x00, 0x00, 0x90, 0x00, 0xc8, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x64, 0x64, 0x00, 0x00,
        0x00, 0xa0, 0x00, 0x65, 0x04, 0x00, 0x00, 0x00, 0x90, 0x00, 0xc8, 0x00, 0x00, 0x00, 0x00, 0x80,
        0xc0, 0x04, 0x02, 0x00, 0x00, 0x00, 0x80, 0x88, 0x04, 0x05, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00,
        0x07, 0x01, 0x09
    ];

    let uint8Array = new Uint8Array(hexData);

    console.log(uint8Array); 
    console.log(uint8Array.length); 


    this.onlineService.publishModifiedScript([uint8Array]);


    const hexData1: number[] = [
      0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00, 0x0f
  ];


  let uint8Array1 = new Uint8Array(hexData1);

  console.log(uint8Array1); 
  console.log(uint8Array1.length); 

  
  this.onlineService.publishModifiedScript([uint8Array1]);
}
else if(this.fileName == 'BROADCASTWR.txt'){

}



}

}
