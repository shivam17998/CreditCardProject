import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  router = inject(Router)
  OnLogoutUser(){
    console.log("Button clicked of user")
    localStorage.removeItem('token');
    this.router.navigateByUrl('login')
    console.log("log out")
  }
  }


