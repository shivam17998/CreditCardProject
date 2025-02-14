import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../Services/services/theme.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewChecked {
  isDarkMode = false; // Default is Light Mode

  constructor(private themeService: ThemeService) {
    // Check local storage for theme preference
    this.isDarkMode = localStorage.getItem('userDarkMode') === 'true';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('userDarkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  applyTheme() {
    const userComponent = document.querySelector('.user-container');
    if (this.isDarkMode) {
      userComponent?.classList.add('dark-mode');
    } else {
      userComponent?.classList.remove('dark-mode');
    }
  }
  

  ngAfterViewChecked(): void {
    console.log("AfterViewChecked executed");

    console.log("section1:", this.section1);
    console.log("section2:", this.section2);
    console.log("section3:", this.section3);
    console.log("section4:", this.section4);
    console.log("section5:", this.section5);
    console.log("section6:", this.section6);
    console.log("section7:", this.section7);

    this.sectionMap = {
      section1: this.section1,
      section2: this.section2,
      section3: this.section3,
      section4: this.section4,
      section5: this.section5,
      section6: this.section6,
      section7: this.section7,
    };

    console.log("Section Map: ", this.sectionMap);
  }

  router = inject(Router);

  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;
  @ViewChild('section4') section4!: ElementRef;
  @ViewChild('section5') section5!: ElementRef;
  @ViewChild('section6') section6!: ElementRef;
  @ViewChild('section7') section7!: ElementRef;

  sectionMap: { [key: string]: ElementRef } = {};

  ngAfterViewInit() {
    
  }

  scrollToSection(sectionId: string) {
    const element = this.sectionMap[sectionId]?.nativeElement;
    
    if (element) {
      console.log(`Scrolling to ${sectionId}`, element);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error(`Section ${sectionId} not found!`);
    }
  }

  OnLogoutUser() {
    console.log("Button clicked: User logout");
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
