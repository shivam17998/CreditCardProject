import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay-now',
  imports: [FormsModule,CommonModule],
  templateUrl: './pay-now.component.html',
  styleUrl: './pay-now.component.scss'
})
export class PayNowComponent {
  amount: number = 0;
  paymentSuccess: boolean = false;
  
  makePayment() {
    if (this.amount > 0) {
      this.paymentSuccess = true;
    } else {
      alert('Please enter a valid amount');
    }
  }

}
