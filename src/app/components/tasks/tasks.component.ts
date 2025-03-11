import { Component } from '@angular/core';
import {Task} from '../../Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Task[] = [];
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService){}

  ngOnInit(): void{
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  editTask(task: Task){
    this.taskToEdit = {...task};
  }

  updateTask(task: Task){
    this.taskService.updateTaskReminder(task).subscribe(() => {
      this.tasks = this.tasks.map((t) => t.id === task.id ? task : t);
      this.taskToEdit = null;
    })
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter((t) => t.id! != task.id));
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  toggleReminder(task: Task){
    task.isDone = !task.isDone;
    this.taskService.updateTaskReminder(task).subscribe();

  }
}
