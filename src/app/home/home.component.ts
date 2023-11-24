import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  implements OnInit {
  private elementRef = inject(ElementRef);

  constructor() {

  }
  ngOnInit(): void {
  }

  servicesAutoScroll() {
    try {
      const servicesElement = this.elementRef.nativeElement.querySelector('#services');
      servicesElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    } catch (err) {}
  }

  @HostListener('window:scroll', ['$event'])
  makeNavBarFixedOnTop() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navElement = this.elementRef.nativeElement.querySelector('#white-navbar');

    if (scrollPosition >= 50) {
      // Cambia la posición del elemento cuando el desplazamiento es mayor o igual a 20px
      // Make navbar fixed on top when scroll > 50px
      navElement.style.setProperty('top', '0');
      navElement.style.setProperty('position', 'fixed');
    } else {
      // Restart default position when scroll < 50px
      navElement.style.transition = 'top 0.3s';
      navElement.style.setProperty('top', ''); // Remove 'Top' property
      navElement.style.setProperty('position', 'relative');
    }
  }


}
