import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
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
  creditCardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with validation
    this.creditCardForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)] // Validates a 16 digit number
      ],
      cardHolder: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Only alphabetic characters
      expiryDate: ['', Validators.required],
      cvv: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}$/)] // Validates 3 digits for CVV
      ]
    });
  }

  // OnSubmit function
  onSubmit() {
    if (this.creditCardForm.valid) {
      console.log('Credit Card Added:', this.creditCardForm.value);
      // You can call a service to save the data or send to an API here
    } else {
      console.log('Form is invalid');
    }
  }

}
