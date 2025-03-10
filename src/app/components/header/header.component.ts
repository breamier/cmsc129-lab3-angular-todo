import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    title: string = 'My To-Do List';
    showAddTask: boolean = false;
    subscription: Subscription;

    constructor(private uiService: UiService){
      this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    }
    ngOnInit(): void{}

    toggleAddTask(){
      this.uiService.toggleAddTask();
    }
}
