import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreitcardDetailsService {

  


   private baseUrl = 'https://localhost:7281/api/CreditCard';  
   
   constructor(private http: HttpClient) {}
 
   
   addCard(id:number, cardType:string,  cardNumber: string, cardHolder: string,expiryDate:Date,cvv:string): Observable<any> {
    const body = {id,cardType,cardNumber, cardHolder,expiryDate,cvv}
    return this.http.post(this.baseUrl, body);
  }

   


 

    	

}
