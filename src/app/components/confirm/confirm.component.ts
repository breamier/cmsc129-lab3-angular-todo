import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Task } from '../../Task';

@Component({
  selector: 'app-confirm',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

}
