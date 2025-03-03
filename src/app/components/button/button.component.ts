import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit{
  @Input() text: string;
  @Output() btnClick = new EventEmitter();

  constructor(){
    this.text = '';
  }

  ngOnInit(): void {
      
  }

  onClick(){
    this.btnClick.emit();

  }
}
