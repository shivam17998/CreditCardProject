import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;

  constructor() {
    // Load theme preference from local storage
    this.isDarkMode = localStorage.getItem('userDarkMode') === 'true';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('userDarkMode', String(this.isDarkMode));
    this.applyTheme();
  }

  applyTheme(): void {
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
