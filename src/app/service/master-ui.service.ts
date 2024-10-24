import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IScript } from '../interfaces/IScript .interface';

@Injectable({
  providedIn: 'root'
})
export class MasterUIService {

  constructor() { }


   private scriptList = new BehaviorSubject<IScript[]>([]);
   public scriptList$ = this.scriptList.asObservable();
 
   // Add a new script to the list
   addScript(script: IScript) {
    const currentList = this.scriptList.value;
    console.log("Current list before adding:", currentList);
  
    this.scriptList.next([...currentList, script]);

    const updatedList = this.scriptList.value;
    console.log("Updated list after adding:", updatedList);
 
    const isAdded = updatedList.includes(script); 
  
  //   const isAddedAlternative = updatedList.some(item => item.scriptType === script.scriptType);
  // console.log(isAddedAlternative);
    console.log(isAdded ? "Script added successfully!" : "Script was not added.");
  }
  
   // provide a method to clear the list
   clearScripts() {
     this.scriptList.next([]);
   }
 
   // Retrieve the current list
   getScripts(): IScript[] {
     return this.scriptList.value;
   }
}
