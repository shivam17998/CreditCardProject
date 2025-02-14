import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { HomeComponent } from "../home/home.component";


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,  ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  errorMessage: string = ''; // Store error message

  currentloginuser:string=''

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private loginService: LoginService, private router: Router) {
     

  }

  onLogin() {
    if (this.loginForm.invalid ) {
      
      this.errorMessage = 'Please fill in all fields correctly.';
      this.loginForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    const { username, password } = this.loginForm.value;
   
   
    

    this.loginService.login(username!, password!).subscribe({
      next: (response) => {
        // this.currentloginuser =response.username
        console.log('Login Successful:');
        localStorage.setItem('token', response.token); // Store token
        this.router.navigateByUrl('home');
      },
      error: (error) => {
        console.error('Login Failed:', error);
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }
}