import { Component } from '@angular/core';
import { BusConfigurationComponent } from "./bus-configuration/bus-configuration.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-exerciser-view',
  standalone: true,
  imports: [
    BusConfigurationComponent,
    RouterOutlet
],
  templateUrl: './exerciser-view.component.html',
  styleUrl: './exerciser-view.component.css'
})
export class ExerciserViewComponent {

}
