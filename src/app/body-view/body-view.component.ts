import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Make sure this is imported
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExerciserViewComponent } from "./Content/exerciser-view/exerciser-view.component";
import { TriggerViewComponent } from "./Content/trigger-view/trigger-view.component";
import { PlotViewComponent } from "./Content/plot-view/plot-view.component";
import { DecodedResultComponent } from "./Content/decoded-result/decoded-result.component";
import { SelectedFrameViewComponent } from "./Content/selected-frame-view/selected-frame-view.component";
import { FooterViewComponent } from "../footer-view/footer-view.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatGridListModule,
    ExerciserViewComponent,
    TriggerViewComponent,
    PlotViewComponent,
    DecodedResultComponent,
    SelectedFrameViewComponent,
    FooterViewComponent,
    RouterOutlet,
  ],
  templateUrl: './body-view.component.html',
  styleUrls: ['./body-view.component.css']
})
export class BodyViewComponent {

  totalAvailableHeight = window.innerHeight - 196; // Subtract any additional offsets like headers
  exerciserHeight = this.totalAvailableHeight * 0.6;
  isResizing = false;
  private startY!: number;
  private startExerciserHeight!: number;

  // Listen for window resize to adjust heights
  @HostListener('window:resize')
  onResize() {
    this.totalAvailableHeight = window.innerHeight - 120;
    this.exerciserHeight = this.totalAvailableHeight * 0.6;
  }

  onMouseDownExerciser(event: MouseEvent): void {
    this.startResizing(event.clientY);
    event.preventDefault();
  }

  onTouchStartExerciser(event: TouchEvent): void {
    this.startResizing(event.touches[0].clientY);
    event.preventDefault();
  }

  private startResizing(clientY: number): void {
    this.isResizing = true;
    this.startY = clientY;
    this.startExerciserHeight = this.exerciserHeight;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (!this.isResizing) return;

    const deltaY = event.clientY - this.startY;
    const newHeight = this.startExerciserHeight + deltaY;

    // Ensure there's enough space for both sections
    if (newHeight > 200 && newHeight < this.totalAvailableHeight - 200) {
      this.exerciserHeight = newHeight;
    }
  };

  private onTouchMove = (event: TouchEvent): void => {
    if (!this.isResizing) return;

    const deltaY = event.touches[0].clientY - this.startY;
    const newHeight = this.startExerciserHeight + deltaY;

    // Ensure there's enough space for both sections
    if (newHeight > 200 && newHeight < this.totalAvailableHeight - 200) {
      this.exerciserHeight = newHeight;
    }
  };

  private onMouseUp = (): void => {
    this.isResizing = false;
    this.removeListeners();
  };

  private removeListeners(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onMouseUp);
  }
}
