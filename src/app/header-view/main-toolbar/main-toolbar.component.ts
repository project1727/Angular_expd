import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],

  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.css',
})
export class MainToolbarComponent {
  toggleMobileMenu(): void {
    const headerTop = document.querySelector('.header-top');
    if (headerTop) {
      headerTop.classList.toggle('is-open-menu');
    }
  }
}
