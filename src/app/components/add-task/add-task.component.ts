import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, NgModule} from '@angular/core';
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
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, NgxMatTimepickerModule, ButtonComponent],
  templateUrl: './add-task.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit{
  @Input() taskToEdit: Task | null = null;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  text: string = '';
  day: string = '';
  time: string = '';
  priority: string = 'low';
  showAddTask: boolean = false;
  subscription: Subscription;

  readonly minDate = new Date();

  constructor(private uiService: UiService){
    this.subscription = this.uiService.onToggle().subscribe((value) => {this.showAddTask = value});
    this.subscription = this.uiService.onCancel().subscribe(() => {this.resetForm();});
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges){
    if(changes['taskToEdit'] && this.taskToEdit){
      
      this.text = this.taskToEdit.name;
      this.day = this.taskToEdit.dueDate;
      this.time = this.taskToEdit.dueTime;
      this.priority = this.taskToEdit.priority;
    
    }
  }

  onSubmit(){
    if(!this.text.trim()){
      alert('Please add a task');
      return;
    }
    if(!this.day){
      alert('Please add a date');
      return;
    }
    if(!this.time){
      alert('Please add a time');
      return;
    }



  if(this.taskToEdit){
    const updatedTask = {...this.taskToEdit,
      name: this.text,
      dateCreated: new Date().toISOString(),
      dueDate: this.day,
      dueTime: this.time,
      isDone: this.taskToEdit.isDone,
      priority: this.priority
      }
      this.onUpdateTask.emit(updatedTask);
    } else {
        const newTask = {
        name: this.text,
        dateCreated: new Date().toISOString(),
        dueDate: this.day,
        dueTime: this.time,
        isDone: false,
        priority: this.priority
      }
      this.onAddTask.emit(newTask);
    }

    this.resetForm();
  }

  resetForm() {
  this.text = '';
  this.day = '';
  this.time = '';
  this.priority = 'low';
  this.taskToEdit = null;
}
}
