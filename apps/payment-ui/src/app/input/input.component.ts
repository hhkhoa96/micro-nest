import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: "./input.component.html",
  imports: [CommonModule]
})
export class AppInputComponent {
  @Input() name = ''
}