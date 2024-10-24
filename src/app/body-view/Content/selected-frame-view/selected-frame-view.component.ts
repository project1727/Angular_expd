import { Component } from '@angular/core';

@Component({
  selector: 'app-selected-frame-view',
  standalone: true,
  imports: [],
  templateUrl: './selected-frame-view.component.html',
  styleUrl: './selected-frame-view.component.css'
})
export class SelectedFrameViewComponent {
  toggleSearch(e: Event) {
    const button = (e.target as Element).closest('button') as HTMLButtonElement;
    button.classList.toggle('active');
    document.querySelector('.mod-table__search--selected')?.classList.toggle('active');
  }
}
