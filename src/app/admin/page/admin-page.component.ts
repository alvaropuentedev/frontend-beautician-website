import { Component, computed, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { TableComponent } from '../components/table/table.component';
import { MessageService } from '../../service/message.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',

})
export class AdminPageComponent {
  private readonly authService = inject( AuthService );
  private readonly adminService = inject(AdminService);
  private readonly  messageService = inject(MessageService);
  private readonly viewportScroller = inject(ViewportScroller);

  public user = computed( () => this.authService.currentUser() );
  public isSidebarVisible = this.adminService.isSidebarVisible;
  public showAlertSucces = this.messageService.showAlertSucces;
  public showAlertError = this.messageService.showAlertError;
  public deleteAlertSucces = this.messageService.deleteAlertSucces;
  public deleteAlertError = this.messageService.deleteAlertError;

  constructor() {this.scrollToTop() }

  toggleSidebar() {
    this.adminService.toggleSidebar();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
