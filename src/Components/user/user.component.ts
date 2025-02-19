import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';
import { CommonModule, DatePipe } from '@angular/common';
import { CardSummayService } from '../../Services/card-summay.service';
import { TransactionService } from '../../Services/transaction.service';
import { EMPTY, switchMap } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports:[CommonModule,DatePipe],
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewChecked {
  private themeKey = 'app-theme';

  availableBalance: string = '$3,200';
  dueDate: string = '25th Feb 2025';
  minimumDue: string = '$100';
  totalDue: string = '$800';
  rewardPoints: number = 2500;
  
  transactions = [
    { date: 'Feb 15, 2025', merchant: 'Amazon', amount: '$120.00' },
    { date: 'Feb 14, 2025', merchant: 'Uber', amount: '$25.50' },
    { date: 'Feb 12, 2025', merchant: 'Starbucks', amount: '$8.75' },
    { date: 'Feb 10, 2025', merchant: 'Netflix', amount: '$15.99' }
  ];
   
  CardSummaryData: any;  // Variable to store fetched card summary data

  creditCardId:any
  creditCardIdres:any

  constructor() {
  
    this.loadTheme();
  }

  cardSummaryServ = inject(CardSummayService)
  cardTransactionServ = inject(TransactionService)

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
  
    if (userId) {
      this.cardSummaryServ.getCardSummaryById(userId).pipe(
        switchMap((res: any) => { // Use switchMap to chain the second call
          this.CardSummaryData = res;
          console.log('Card Summary Data:', this.CardSummaryData);
  
          if (res && res.length > 0) { // Check if the response is valid and has data
            const creditCardId = res[0].cardId; // Extract cardId from the response
            return this.cardTransactionServ.getTransactionByCardId(creditCardId); // Call the second API
          } else {
            console.log("No card summary found for user.");
            return EMPTY; // Return an empty observable to complete without emitting
          }
        })
      ).subscribe(
        (transactionRes) => { // This will receive the result of the second API call
          this.creditCardIdres = transactionRes;
          console.log("Result of transaction:", this.creditCardIdres);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.log('UserId not found in localStorage');
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  getTheme(): string {
    return localStorage.getItem(this.themeKey) || 'light';
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
    localStorage.removeItem('userId');
    localStorage.removeItem('app-theme');
    this.router.navigateByUrl('login');
  }

   
  differntTypesofcards(){
    this.router.navigateByUrl('cardtype');

  }
  PayNow(){
    console.log("pay button clicked")
    this.router.navigateByUrl('paynow')
  }
  getTotalAmount(): number {
    return this.creditCardIdres.reduce((sum: any, txn: { amount: any; }) => sum + txn.amount, 0);
  }
  

  

}
