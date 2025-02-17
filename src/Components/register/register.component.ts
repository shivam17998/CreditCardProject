import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'; // Add FormBuilder, FormGroup, and Validators
import { LoginService } from '../../Services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string = ''; // Store error message
  successMessage: string = ''; // Store success message

  // Define the form group for the form
  userForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    // Initialize the form group with validation rules
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  OnSubmitRegister() {
    // Check if the form is valid
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      this.userForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    // Extract form values
    const { username, email, password, role } = this.userForm.value;

    // Call the LoginService to register the user
    this.loginService.register(username, email, password, role).subscribe({
      next: (response) => {
        console.log('Registration Successful:', response);
        localStorage.setItem('token', response.token); // Store the token
        this.router.navigateByUrl('login'); // Navigate to the home page after successful registration
      },
      error: (error) => {
        console.error('Registration Failed:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });

  }
}
