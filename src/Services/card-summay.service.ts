import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardSummayService {
  private baseUrl = 'https://localhost:7281/api/CardSummary/';  // Base URL without the specific ID
  
  constructor(private http: HttpClient) {}

  // Method to fetch CardSummary by ID
  getCardSummaryById(userId: string) {
    const url = `${this.baseUrl}${userId}`;  // Dynamically create the URL based on cardId
    return this.http.get(url);  // Make the GET request with dynamic URL
  }
  
   
    


}
