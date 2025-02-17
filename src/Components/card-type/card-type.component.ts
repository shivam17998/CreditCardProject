import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-type',
  imports: [CommonModule,FormsModule],
  templateUrl: './card-type.component.html',
  styleUrl: './card-type.component.scss'
})
export class CardTypeComponent {
 

  cards = [
    { cardType: 'Visa Platinum', cardNumber: '**** **** **** 1234', expiryDate: '12/25', availableBalance: '$5,000', status: 'Active', imageUrl: 'image_visa_platinum.jpg' },
    { cardType: 'MasterCard Gold', cardNumber: '**** **** **** 5678', expiryDate: '06/24', availableBalance: '$2,500', status: 'Inactive', imageUrl: 'image_mastercard_gold.jpg' },
    { cardType: 'Amex Blue', cardNumber: '**** **** **** 9876', expiryDate: '10/23', availableBalance: '$3,800', status: 'Active', imageUrl: 'image_amex_blue.jpg' },
    { cardType: 'Discover It', cardNumber: '**** **** **** 1111', expiryDate: '08/25', availableBalance: '$7,200', status: 'Active', imageUrl: 'image_discover_it.jpg' },
    { cardType: 'Visa Classic', cardNumber: '**** **** **** 4321', expiryDate: '11/23', availableBalance: '$1,500', status: 'Inactive', imageUrl: 'image_visa_classic.jpg' },
    { cardType: 'MasterCard Platinum', cardNumber: '**** **** **** 2345', expiryDate: '05/26', availableBalance: '$4,500', status: 'Active', imageUrl: 'image_mastercard_platinum.jpg' },
    { cardType: 'Amex Green', cardNumber: '**** **** **** 6789', expiryDate: '02/24', availableBalance: '$6,000', status: 'Active', imageUrl: 'image_amex_green.jpg' },
    { cardType: 'Visa Signature', cardNumber: '**** **** **** 4321', expiryDate: '07/25', availableBalance: '$9,000', status: 'Active', imageUrl: 'image_visa_signature.jpg' },
    { cardType: 'MasterCard Titanium', cardNumber: '**** **** **** 9876', expiryDate: '12/26', availableBalance: '$10,000', status: 'Inactive', imageUrl: 'image_mastercard_titanium.jpg' },
    { cardType: 'Discover More', cardNumber: '**** **** **** 5555', expiryDate: '04/23', availableBalance: '$8,000', status: 'Active', imageUrl: 'image_discover_more.jpg' },
    { cardType: 'Visa Infinite', cardNumber: '**** **** **** 1357', expiryDate: '03/27', availableBalance: '$11,000', status: 'Active', imageUrl: 'image_visa_infinite.jpg' },
    { cardType: 'MasterCard World', cardNumber: '**** **** **** 2468', expiryDate: '01/25', availableBalance: '$2,000', status: 'Inactive', imageUrl: 'image_mastercard_world.jpg' },
    { cardType: 'Amex Platinum', cardNumber: '**** **** **** 7777', expiryDate: '09/26', availableBalance: '$5,000', status: 'Active', imageUrl: 'image_amex_platinum.jpg' },
    { cardType: 'Discover It Miles', cardNumber: '**** **** **** 8888', expiryDate: '08/24', availableBalance: '$7,800', status: 'Inactive', imageUrl: 'image_discover_it_miles.jpg' },
    { cardType: 'Visa Signature Rewards', cardNumber: '**** **** **** 1920', expiryDate: '11/27', availableBalance: '$4,200', status: 'Active', imageUrl: 'image_visa_signature_rewards.jpg' },
    { cardType: 'MasterCard Standard', cardNumber: '**** **** **** 3344', expiryDate: '03/23', availableBalance: '$2,000', status: 'Active', imageUrl: 'image_mastercard_standard.jpg' },
    { cardType: 'Amex Gold', cardNumber: '**** **** **** 1010', expiryDate: '06/25', availableBalance: '$5,500', status: 'Active', imageUrl: 'image_amex_gold.jpg' },
    { cardType: 'Visa Business', cardNumber: '**** **** **** 2468', expiryDate: '10/24', availableBalance: '$3,000', status: 'Inactive', imageUrl: 'image_visa_business.jpg' },
    { cardType: 'MasterCard Business', cardNumber: '**** **** **** 3456', expiryDate: '07/26', availableBalance: '$6,500', status: 'Active', imageUrl: 'image_mastercard_business.jpg' },
    { cardType: 'Discover Cashback', cardNumber: '**** **** **** 7890', expiryDate: '01/24', availableBalance: '$9,500', status: 'Active', imageUrl: 'image_discover_cashback.jpg' },
    { cardType: 'Visa Rewards', cardNumber: '**** **** **** 6543', expiryDate: '04/27', availableBalance: '$7,800', status: 'Inactive', imageUrl: 'image_visa_rewards.jpg' },
    { cardType: 'MasterCard Rewards', cardNumber: '**** **** **** 5670', expiryDate: '05/25', availableBalance: '$2,300', status: 'Active', imageUrl: 'image_mastercard_rewards.jpg' },
    { cardType: 'Amex Delta', cardNumber: '**** **** **** 3451', expiryDate: '09/27', availableBalance: '$3,600', status: 'Active', imageUrl: 'image_amex_delta.jpg' },
    { cardType: 'Visa Secure', cardNumber: '**** **** **** 2222', expiryDate: '12/24', availableBalance: '$8,300', status: 'Inactive', imageUrl: 'image_visa_secure.jpg' },
    { cardType: 'MasterCard Secure', cardNumber: '**** **** **** 8765', expiryDate: '02/28', availableBalance: '$4,000', status: 'Active', imageUrl: 'image_mastercard_secure.jpg' },
    { cardType: 'Amex Blue Cash', cardNumber: '**** **** **** 4321', expiryDate: '06/24', availableBalance: '$5,100', status: 'Inactive', imageUrl: 'image_amex_blue_cash.jpg' },
    { cardType: 'Visa Business Signature', cardNumber: '**** **** **** 9999', expiryDate: '05/26', availableBalance: '$12,000', status: 'Active', imageUrl: 'image_visa_business_signature.jpg' },
    { cardType: 'MasterCard Business Rewards', cardNumber: '**** **** **** 2468', expiryDate: '07/25', availableBalance: '$7,400', status: 'Inactive', imageUrl: 'image_mastercard_business_rewards.jpg' }
  ];
  

  searchQuery: string = '';
  recordsPerPage: number = 5;
  currentPage: number = 1;
  recordsOptions: number[] = [5, 6, 7, 10];

  get filteredCards() {
    return this.cards.filter(card =>
      card.cardType.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredCards.length / this.recordsPerPage);
  }

  get paginatedCards() {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    return this.filteredCards.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
