import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  constructor() {}

  first() {
    try {
      const servicesElement = this.elementRef.nativeElement.querySelector('#services');
      servicesElement.scrollIntoView({
        behavior: 'smooth',
      });
    } catch (err) {}
  }
}
