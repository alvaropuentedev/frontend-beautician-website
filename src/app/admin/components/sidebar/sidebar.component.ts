import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal, Ripple, initTE, Sidenav, Datetimepicker, Input } from 'tw-elements';
import { MessageService } from '../../../service/message.service';
import { ErrorFieldComponent } from '../../../shared/error-field/error-field.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorFieldComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private readonly authService    = inject(AuthService);
  private readonly adminService   = inject(AdminService);
  private readonly messageService = inject(MessageService);
  private readonly fb             = inject(FormBuilder);

  public user = computed(() => this.authService.currentUser());
  public showAlertSucces = this.messageService.showAlertSucces;
  public showAlertError = this.messageService.showAlertError;
  public showModal: boolean = false;
  public isSidebarVisible = this.adminService.isSidebarVisible;

  // signal with all clients list
  public clientList$ = this.adminService.clientList$();


  // ? FORM
  public createClientForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$')]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    appointment_date: ['', Validators.required],
  });
  // ? VALIDATORS MESSAGES
  public validationMessages = {
    name: {
      required: 'Introduce un nombre válido',
      name: 'Introduce un nombre válido',
      pattern: 'El nombre solo puede contener letras'
    },
    phone: {
      required: 'Introduce un teléfono válido',
      phone: 'Introduce un teléfono válido',
      pattern: 'El teléfono solo puede contener números'
    },
    appointment_date: {
      required: 'Introduce una fecha válida',
      appointment_date: 'Introduce una fecha válida',
    },

  };

  constructor() { }

  ngOnInit(): void {
    // components tw-elements
    initTE({ Modal, Ripple, Sidenav, Datetimepicker, Input });
    this.sharedLoad();
  }
  get name() {
    return this.createClientForm.get('name');
  }
  get phone() {
    return this.createClientForm.get('phone');
  }
  get appointment_date() {
    return this.createClientForm.get('appointment_date');
  }

  submitClientForm() {
    if (this.checkAppointmentExist()) {
      this.isSidebarVisible.set(false);
      this.messageService.handleAlertErrorMsg();
    } else {
      this.isSidebarVisible.set(false);
      const { name, phone, appointment_date } = this.createClientForm.value;
      this.adminService.createClient(name, phone, appointment_date).subscribe({
        next: () => {
          this.messageService.handleAlertSuccesMsg();
          this.sharedLoad();
          this.createClientForm.reset();
        },
        error: () => {
          this.messageService.handleAlertErrorMsg();
        },
      });
    }
  }

  checkAppointmentExist() {
    const appointmentDateControl = this.createClientForm.get('appointment_date');
    const checkAppointmentExist = this.clientList$?.some(
      client => client.appointment_date === appointmentDateControl?.value
    );
    return checkAppointmentExist;
  }

  // Func for call getListClients
  sharedLoad() {
    this.adminService.sendNewClientEvent();
  }

  logout() {
    this.isSidebarVisible.set(false);
    this.authService.logout();
  }
}
