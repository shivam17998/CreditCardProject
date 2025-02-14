import { Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() username: string = '';

  router = inject(Router)

  OnLogout(){
    console.log("Button clicked")
    localStorage.removeItem('token');
    this.router.navigateByUrl('login')
    console.log("log out")
  }

}
