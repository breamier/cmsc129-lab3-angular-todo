import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    title: string = 'My To-Do List';

    constructor(){

    }
    ngOnInit(): void{}

    toggleAddTask(){
      console.log('toggle');
    }
}
