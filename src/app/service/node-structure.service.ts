// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class NodeStructureService {

//   constructor() { }


 
//   // Create a BehaviorSubject to hold the BCR value
//   private bcrSubject = new BehaviorSubject<number | null>(null);
//   private bcrValueSubject = new BehaviorSubject<number | null>(null);

//   // Observable for BCR changes
//   public bcr$ = this.bcrSubject.asObservable();

//   // Observable for BCRValue changes
//   public bcrValue$ = this.bcrValueSubject.asObservable();


//   public updateBCR(newBCR: number): void {
//     this.bcrSubject.next(newBCR);
//    alert("done "+newBCR);
//   }

//   // Method to update the BCRValue (from RegistersComponent)
//   public updateBCRValue(newBCRValue: number): void {
//     this.bcrValueSubject.next(newBCRValue);
//     this.updateBCR(newBCRValue); // Updates BCR when BCRValue changes
//   }

// }
