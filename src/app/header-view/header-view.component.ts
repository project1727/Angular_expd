import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MainToolbarComponent } from "./main-toolbar/main-toolbar.component";
import { SubToolbarComponent } from "./sub-toolbar/sub-toolbar.component";
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header-view',
  standalone: true,
  imports: [NgIf, MainToolbarComponent, SubToolbarComponent , MatToolbarModule],
  templateUrl: './header-view.component.html',
  styleUrl: './header-view.component.css'
})
export class HeaderViewComponent {
@Input() isConnected: boolean = true;
}
