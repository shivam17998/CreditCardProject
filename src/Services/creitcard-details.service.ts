import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreitcardDetailsService {

  

  // i am mofify the card-summary api here please note its important
   private baseUrl = 'https://localhost:7281/api/CardSummary';  
   
   constructor(private http: HttpClient) {}
 
   
   addCard(UserId:number, CardId: number, cardType: string, cardNumber: string, cardHolder: string, expiryDate: Date, cvv: string, availableBalance: any, limit: any): Observable<any> {
    const body = {UserId,CardId,cardType,cardNumber, cardHolder,expiryDate,cvv,availableBalance,limit}
    return this.http.post(this.baseUrl, body);
  }

   


 

    	

}
