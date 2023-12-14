import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  private readonly authService = inject( AuthService );

  public user = computed( () => this.authService.currentUser() );
  constructor() { }

}
