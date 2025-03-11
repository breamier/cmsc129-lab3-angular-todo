import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-task',
  imports: [ FormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, NgxMatTimepickerModule ],
  templateUrl: './add-task.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit{
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string = '';
  day: string = '';
  time: string = '';
  priority: string = 'low';
  showAddTask: boolean = false;
  subscription: Subscription;

  readonly minDate = new Date();

  constructor(private uiService: UiService){
    this.subscription = this.uiService.onToggle().subscribe((value) => {this.showAddTask = value});
  }

  ngOnInit(): void {}

  onSubmit(){
    if(!this.text.trim()){
      alert('Please add a task');
      return;
    }

    const newTask = {
      name: this.text,
      dateCreated: new Date().toISOString(),
      dueDate: this.day,
      dueTime: this.time,
      isDone: false,
      priority: this.priority
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.priority = 'low';
    this.time = '';
  }
}
