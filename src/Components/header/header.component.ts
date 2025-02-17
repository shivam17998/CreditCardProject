import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';



@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() username: string = '';


  logout(){

  }
  constructor(){
    console.log("from header",this.username) 
  }



}
