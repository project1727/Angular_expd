import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trigger-view',
  standalone: true,
  templateUrl: './trigger-view.component.html',
  styleUrls: ['./trigger-view.component.css']
})
export class TriggerViewComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initializeDropdowns();
  }

  initializeDropdowns(): void {
    const selectedAll: NodeListOf<HTMLElement> = document.querySelectorAll('.wrapper-dropdown');

    selectedAll.forEach((selected) => {
      const arrow: HTMLElement = selected.querySelector('.dropdown-arrow') as HTMLElement;
      const optionsList: NodeListOf<HTMLLIElement> = selected.querySelectorAll('ul.dropdown li');

      // Toggle dropdown on wrapper click (including SVG and text)
      selected.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up
        const isActive = selected.classList.contains('active');
        this.handleDropdown(selected, arrow, !isActive);

        // If dropdown is opened, close any other dropdowns
        if (!isActive) {
          this.closeAllDropdowns(selected);
        }
      });

      // Update the display of the dropdown on option click
      optionsList.forEach((option) => {
        option.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the click from bubbling up
          const selectedDisplay: HTMLElement | null = selected.querySelector('.selected-display');
          if (selectedDisplay) {
            selectedDisplay.innerHTML = option.innerHTML;
          }
          this.handleDropdown(selected, arrow, false); // Close the dropdown after selection
        });
      });
    });

    // Close dropdowns when clicking outside
    window.addEventListener('click', () => {
      this.closeAllDropdowns();
    });
  }

  closeAllDropdowns(exclude?: HTMLElement): void {
    const selectedAll: NodeListOf<HTMLElement> = document.querySelectorAll('.wrapper-dropdown');
    selectedAll.forEach((selected) => {
      if (selected !== exclude) {
        const arrow: HTMLElement = selected.querySelector('.dropdown-arrow') as HTMLElement;
        this.handleDropdown(selected, arrow, false);
      }
    });
  }

  handleDropdown(dropdown: HTMLElement, arrow: HTMLElement, open: boolean): void {
    if (open) {
      arrow.classList.add('rotated');
      dropdown.classList.add('active');
    } else {
      arrow.classList.remove('rotated');
      dropdown.classList.remove('active');
    }
  }
}
