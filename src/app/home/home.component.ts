import { Component, ElementRef, HostListener, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {}

  // * Func handle scroll to target and remove focus
  handleAutoScrollAndFocus(elementId: string, scrollTarget: string) {
    const elementFocus: HTMLElement | null = this.elementRef.nativeElement.querySelector(`#${elementId}`);
    if (elementFocus) {
      elementFocus.blur();
    }
    const targetElement = this.elementRef.nativeElement.querySelector(`#${scrollTarget}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }

  // * white navbar auto top 0 position on scroll
  @HostListener('window:scroll', ['$event'])
  makeNavBarFixedOnTop() {
    const scrollPosition =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navElement = this.elementRef.nativeElement.querySelector('#white-navbar');

    if (scrollPosition >= 50) {
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
