import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

   private baseUrl = 'https://localhost:7281/api/CreditCard/User'; 
   
   
    
    constructor(private http: HttpClient) {}
  
    // Method to fetch CardSummary by ID
    getUserList() {
      const url = `${this.baseUrl}`;
      return this.http.get(url); 
    }

    // Method to update user by ID
    updateUser( userData: any) {
      const url = `${this.baseUrl}/${userData.id}`;
      return this.http.put(url, userData);
    }

    deleteUser( userData: any) {

      console.log("Api call",userData)
      const url = `${this.baseUrl}/${userData}`;
      return this.http.delete(url, userData);
    }
}
