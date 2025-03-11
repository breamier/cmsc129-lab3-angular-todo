import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faCheckSquare, faSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit{
  @Input() task!: Task; 
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTrash = faTrash;
  faEdit = faEdit;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  showEditTask: boolean = false;
  subscription: Subscription;

  constructor(private dialogService: DialogService, private uiService: UiService){
    this.subscription = this.uiService.onToggle().subscribe(value => this.showEditTask = value);
  }
    
  ngOnInit(): void {
      
  }

  toggleAddTask(){
      this.uiService.toggleAddTask();
    }

  editTask(){
    this.onEditTask.emit(this.task);
    this.uiService.toggleAddTask();
  }
  
  onDelete(task: Task){
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task){
    this.onToggleReminder.emit(task);
  }

  openDialog(task: Task){
    this.dialogService.confirmDialog().subscribe((confirmed) => {
      if(confirmed){
        this.onDeleteTask.emit(task);
      }
    });
  }
}
