import { Component, ElementRef, Renderer2, inject } from '@angular/core';
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
}
