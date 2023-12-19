import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationPipe } from './validation.pipe';

@Component({
  selector: 'app-error-field',
  standalone: true,
  imports: [CommonModule, ValidationPipe],
  templateUrl: './error-field.component.html',
  styleUrl: './error-field.component.css'
})
export class ErrorFieldComponent {
public formDirective = inject(FormGroupDirective);

  @Input() control!: FormControl | AbstractControl;
  @Input() errorMessages!: object;
}
