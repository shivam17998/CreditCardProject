import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';
import { CommonModule } from '@angular/common';
import { CardSummayService } from '../../Services/card-summay.service';
import { TransactionService } from '../../Services/transaction.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports:[CommonModule],
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
    // Get the userId from localStorage
    const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage

    // Check if userId exists in localStorage
    if (userId) {
      // If userId is found, call the service method to get the card summary
      this.cardSummaryServ.getCardSummaryById(userId).subscribe(
        (res) => {
          this.CardSummaryData = res;  // Store the API response data
          this.creditCardId = this.CardSummaryData[0].cardId;
          console.log('Card Summary Data:', this.CardSummaryData);
          
        },
        (error) => {
          console.error('Error fetching card summary:', error);
        }
      );
    } else {
      console.log('UserId not found in localStorage');
    }
    console.log(this.creditCardId)
    if(this.creditCardId){
     
      this.cardTransactionServ.getTransactionByCardId(this.creditCardId).subscribe((res)=>{
        this.creditCardIdres = res;
        console.log("result of transaction",this.creditCardIdres )
      })
      console.log("result",this.creditCardIdres);
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
    this.router.navigateByUrl('login');
  }

   
  differntTypesofcards(){
    this.router.navigateByUrl('cardtype');

  }
  PayNow(){
    console.log("pay button clicked")
    this.router.navigateByUrl('paynow')
  }

  

}
