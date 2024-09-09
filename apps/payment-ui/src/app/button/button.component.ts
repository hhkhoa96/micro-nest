import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: "./button.component.html",
  imports: [CommonModule]
})
export class AppButtonComponent {
  @Input() label = ""
  @Input() type = "button"
  @Output() onClickEvent = new EventEmitter()

  onClick(event: MouseEvent) {
    this.onClickEvent.emit(event)
  }
}