import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal, Ripple, initTE, Sidenav, Datetimepicker, Input } from 'tw-elements';
import { MessageService } from '../../../service/message.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly adminService = inject(AdminService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  public user = computed(() => this.authService.currentUser());
  public showAlertSucces = this.messageService.showAlertSucces;
  public showAlertError = this.messageService.showAlertError;
  public visibilitySidebar:boolean = true;
  ngClass: string = '';

  public createClientForm: FormGroup = this.fb.group({
    name: [' ', Validators.required],
    phone: [' ',[Validators.required, Validators.pattern(/^[0-9]+$/)]],
    appointment_date: [' ', Validators.required],
  });
  public  phoneControl? = this.createClientForm.get('phone');
  ngOnInit(): void {
    // components tw-elements
    initTE({ Modal, Ripple, Sidenav, Datetimepicker, Input });
  }

  submitClientForm() {
    const { name, phone, appointment_date } = this.createClientForm.value;
    this.adminService.createClient(name, phone, appointment_date).subscribe({
      next: () => {
        this.messageService.handleAlertSuccesMsg();
        this.sharedLoad();
      },
      error: () => {
        this.messageService.handleAlertErrorMsg();
      },
    });
  }

  sharedLoad() {
    this.adminService.sendNewClientEvent();
  }

  logout() {
    this.authService.logout();
  }

  modalClose() {
    this.visibilitySidebar = false
  }

}
