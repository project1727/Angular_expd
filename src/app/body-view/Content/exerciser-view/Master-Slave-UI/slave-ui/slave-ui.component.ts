import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { eBroadcastCCC } from '../../../../../enums/enum';

@Component({
  selector: 'app-slave-ui',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    NgIf,
    MatSelect,
    MatOption,
    NgFor,
    FormsModule
  ],
  templateUrl: './slave-ui.component.html',
  styleUrl: './slave-ui.component.css'
})
export class SlaveUIComponent implements OnInit {
  numbers: number[] = [8, 7, 6, 5, 4, 3, 2, 1, 0];
  selectedTab:string='Sys';
  ACKNack:String='NACK';
  eBroadcast=eBroadcastCCC;
  BrodCasteType: string[] = [];
  messageTypes: string[] = [
    'BroadCast',
    'Directed',
    'Private',
    'IBI',
    'I2C',
    'Hotjoin',
    'MasterShipReq'
  ];

  selectedMessageType: string = '';



  ngOnInit() {
    this.BrodCasteType = Object.keys(this.eBroadcast).filter(key => isNaN(Number(key)));  
  }
  onTabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.tab.textLabel;
  }
}
